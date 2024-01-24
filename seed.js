import { EntryModel, closeConnection } from "./db.js"

const entries = [
    {category: 'Food', content: 'Pizza is yummy'},
    {category: 'Coding', content: 'Coding is fun'},
    {category: 'Gaming', content: 'Skyrim is for Nords'}
]

await EntryModel.deleteMany()
console.log('Delete Entries')

await EntryModel.insertMany(entries)
console.log('Added Entries')


closeConnection()
// process.kill(process.pid, 'SIGINT')