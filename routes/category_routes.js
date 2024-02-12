import { Router } from "express"
import { CategoryModel } from "../db.js"

const router =  Router()

router.get('/', async (req, res) => res.send(await CategoryModel.find()))

router.get('/:id', async (req, res) => {
    const category = await CategoryModel.findById(req.params.id)
    if (category) {
        res.send(category)
    } else {
        res.status(404).send({ error: 'Entry not found' })
    }
})

router.post('/', async (req, res) => {
    try {
        const insertedCategory = await CategoryModel.create(req.body)
        res.status(201).send(insertedCategory)
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const updatedCategory = await CategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (updatedCategory) {
            res.send(updatedCategory)
        } else {
            res.status(404).send({ error: 'Entry not found' })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const deletedCategory = await CategoryModel.findByIdAndDelete(req.params.id)
        if (deletedCategory) {
            res.sendStatus(204)
        } 
        else {
            res.status(404).send({ error: 'Entry not found' })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

export default router

