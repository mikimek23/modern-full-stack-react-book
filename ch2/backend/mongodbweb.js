import { createServer } from 'node:http'
import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27018/'
const client = new MongoClient(url)
try {
  await client.connect()
  console.log('Successfully connected to the db')
} catch (error) {
  console.error('Error while connecting a database:', error)
}
const server = createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  try {
    // 1. Get the database and collection RIGHT NOW when the request happens
    const database = client.db('ch2')
    const collection = database.collection('users')

    // 2. Fetch the documents
    const userList = await collection.find({}).toArray()

    // 3. Log to your terminal so you can see if Node sees them
    console.log(`Found ${userList.length} users in ch2.users`)

    res.statusCode = 200
    res.end(JSON.stringify(userList))
  } catch (error) {
    console.error('Server Error:', error)
    res.statusCode = 500
    res.end(JSON.stringify({ error: 'Failed to fetch data' }))
  }
})
server.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`)
})
