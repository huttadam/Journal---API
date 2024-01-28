import express from 'express'
import categoryRoutes from './routes/category_routes.js'
import entryRoutes from './routes/entry_routes.js'



const app = express()

app.use(express.json())


app.get('/', (req, res) => res.send({ info: 'Journal API' }))

app.use('/categories', categoryRoutes)

app.use('/entries', entryRoutes)

app.listen(4001)