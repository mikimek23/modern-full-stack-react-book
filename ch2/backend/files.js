import { writeFileSync, readFileSync } from 'node:fs'
const users = [{ name: 'Abebe', email: 'abebe@gmail.com' }]
const userJson = JSON.stringify(users)
writeFileSync('backend/users.json', userJson)
const readUserJson = readFileSync('backend/users.json')
const readUser = JSON.parse(readUserJson)
console.log(readUser)
