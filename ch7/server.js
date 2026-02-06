import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import fs from 'fs'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const createProdServer = async () => {
  const app = express()
  app.get('/favicon.ico', (req, res) => res.status(204).end())
  app.use((await import('compression')).default())
  app.use(
    (await import('serve-static')).default(
      path.resolve(__dirname, 'dist/client'),
      {
        index: false,
      },
    ),
  )
  app.use(async (req, res, next) => {
    try {
      let template = fs.readFileSync(
        path.resolve(__dirname, 'dist/client/index.html'),
        'utf-8',
      )
      const render = (await import('./dist/server/entry-server.js')).render
      const appHtml = await render(req)
      const html = template.replace(`<!--ssr-outlet-->`, appHtml)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      next(e)
    }
  })
  return app
}

const createDevServer = async () => {
  const app = express()
  app.get('/favicon.ico', (req, res) => res.status(204).end())
  // serve public files (including dotfiles) before Vite middleware and SSR
  app.use(
    express.static(path.resolve(__dirname, 'public'), { dotfiles: 'allow' }),
  )
  // Serve public "/.well-known/*" files explicitly (avoid path-to-regexp patterns).
  app.get(/^\/\.well-known(\/.*)?$/, (req, res) => {
    const publicRoot = path.resolve(__dirname, 'public')
    const relativePath = req.path.replace(/^\/+/, '')
    const filePath = path.resolve(publicRoot, relativePath)

    // Prevent path traversal (e.g. "/.well-known/../../secret")
    const rel = path.relative(publicRoot, filePath)
    if (rel.startsWith('..') || path.isAbsolute(rel)) {
      return res.status(403).send('Forbidden')
    }

    if (fs.existsSync(filePath)) return res.sendFile(filePath)
    return res.status(404).send('Not Found')
  })

  const vite = await (
    await import('vite')
  ).createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  })
  app.use(vite.middlewares)
  app.use(async (req, res, next) => {
    try {
      const templateHtml = fs.readFileSync(
        path.resolve(__dirname, 'index.html'),
        'utf-8',
      )
      const template = await vite.transformIndexHtml(
        req.originalUrl,
        templateHtml,
      )
      const { render } = await vite.ssrLoadModule('/src/entry-server.jsx')
      const appHtml = await render(req)
      // if render returns falsy (e.g. router didn't match), skip SSR so static middleware can handle
      if (!appHtml) return next()
      const html = template.replace(`<!--ssr-outlet-->`, appHtml)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      // If React Router threw a 404, skip SSR so static files (or 404 middleware) can respond
      if (e && e.status === 404) return next()
      next(e)
    }
  })
  return app
}
if (process.env.NODE_ENV === 'production') {
  const app = await createProdServer()
  app.listen(process.env.PORT, () =>
    console.log(
      `ssr production server running on http://localhost:${process.env.PORT}`,
    ),
  )
} else {
  const app = await createDevServer()
  app.listen(process.env.PORT, () => {
    console.log(
      `ssr dev server running on http://localhost:${process.env.PORT}`,
    )
  })
}
