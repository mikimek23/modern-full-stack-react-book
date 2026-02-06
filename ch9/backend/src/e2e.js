import dotenv from 'dotenv'
dotenv.config()
import globalSetup from './test/globalSetup.js'
import { initDatabase } from './db/init.js'
import { app } from './app.js'

async function runTestingServer() {
  await globalSetup()
  await initDatabase()
  const PORT = process.env.PORT
  app.listen(PORT)
  console.info('TESTING ecpr')
}
runTestingServer()
