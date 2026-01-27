import { createServer } from 'node:http'
import { readFileSync } from 'node:fs'

const server = createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Typing', 'aplication/json')
  res.end(readFileSync('backend/users.json'))
})

server.listen(3000, () => {
  console.log('server is running')
})
