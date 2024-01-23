import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

const categories = ['Food', 'Coding', 'Gaming', 'Other']

// const entries = [
//     {category: 'Food', content: 'Pizza is yummy'},
//     {category: 'Coding', content: 'Coding is fun'},
//     {category: 'Gaming', content: 'Skyrim is for Nords'}]


mongoose.connect(process.env.DB_URI)
    .then(m => console.log(m.connection.readyState === 1 ? 'MongoDB connected!': 'MongoDB failed to connect!'))
    .catch(err => console.error(err))


const entriesSchema = new mongoose.Schema({
    category: { type: String, required: true },
    content: { type: String, required: true }
})

const EntryModel = mongoose.model('Entry', entriesSchema)

const app = express()

app.use(express.json())

app.get('/', (req, res) => res.send({ info: 'Journal API' }))

app.get('/categories', (req, res) => res.send(categories))

app.get('/entries', (req, res) => res.send(entries))

app.get('/entries/foo', (req, res) => res.send({ foo: 'bar' }))

app.get('/entries/:id', (req, res) => {
    const entry = entries[req.params.id - 1]
    if (entry) {
        res.send(entry)
    } else {
        res.status(404).send({ error: 'Entry not found' })
    }
})

app.post('/entries', async (req, res) => {
    try {
        // Get entry data from the request
        // console.log(req.body)
        // TODO: Validate
        // Create a new entry object
        // Push the new entry to the array
        // entries.push(req.body)
        const insertedEntry = await EntryModel.create(req.body)
        // Respond with 201 and the created entry
        res.status(201).send(insertedEntry)
    }
    catch (err) {
        res.status(400).send({ error: err.message })
    }
})
    

app.listen(4001);

