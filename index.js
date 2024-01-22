import express from 'express';

const app = express()

const categories = ['Food', 'Coding', 'Gaming', 'Other']

// app.get('/', (req,res) => res.send('<h1>Home</h1>'))

const entries = [
    {category: 'Food', content: 'Pizza is yummy'},
    {category: 'Coding', content: 'Coding is fun'},
    {category: 'Gaming', content: 'Skyrim is for Nords'}

]
// Will check for JSON body and put the parsed object into req.body

app.use(express.json())

app.get('/', (req,res) => res.send({info: 'Journal - API'}))
app.get('/categories', (req,res) => res.status(201).send(categories))
app.get('/entries', (req,res) => res.status(200).send(entries))
app.get('/entries/:id', (req,res) =>{
    res.sendStatus(204)

} )


app.post('/entries', (req,res) =>{
    //Get Entry dat from the request
    console.log(req.body)
    // TODO: Validate
    // Create a new entry object
    // Push the new entry to the array
    entries.push(req.body)
    // Respond with 201 and the created entry
    res.status(201).send(entries[entries.length-1])

})

app.listen(4001);

