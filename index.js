import express from 'express';
import { EntryModel, CategoriesModel } from './db.js';

// const categories = ['Food', 'Coding', 'Gaming', 'Other']

const app = express()

app.use(express.json())

app.get('/', (req, res) => res.send({ info: 'Journal API' }))

app.get('/categories', async (req, res) => res.send(await CategoriesModel.find({})))

app.get('/entries', async (req, res) => res.send(await EntryModel.find()))

app.get('/entries/:id', async (req, res) => {
    const entry = await EntryModel.findOne({_id: req.params.id})
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

app.put('/entries/:id', async (req, res) => {
    try {
        const updatedEntry = await EntryModel.findByIdAndUpdate(req.params.id,req.body, {new: true})
        if (updatedEntry){
        res.send(updatedEntry)}
        else{
            res.status(404).send({error: "Entry not Found"})
        }
    
    }
    catch (err) {
        res.status(400).send({ error: err.message })
    }
})

app.delete('/entries/:id', async (req, res) => {
    try {
        const deletedEntry = await EntryModel.findByIdAndDelete(req.params.id,req.body)
        if (deletedEntry){
        res.sendStatus(204)}
        else{
            res.status(404).send({error: "Entry not Found"})
        }
    
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})
    

app.listen(4001);

