import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

try {
const m = await mongoose.connect(process.env.DB_URI)
    console.log(m.connection.readyState === 1 ? 'MongoDB connected!': 'MongoDB failed to connect!')
}
catch(e) {
    console.log(err)
}

process.on('SIGINT', () => {
    console.log('Mongoose disconnecting ...')
    mongoose.disconnect()
})

const closeConnection = () =>{
    console.log('Mongoose disconnecting ...')
    mongoose.disconnect()
}

const entriesSchema = new mongoose.Schema({
    category: { type: String, required: true },
    content: { type: String, required: true }
})

const EntryModel = mongoose.model('Entry', entriesSchema)


const categoriesSchema = new mongoose.Schema({
    name: { type: String, required: true },
})

const CategoriesModel = mongoose.model('Category', categoriesSchema)


export { EntryModel , CategoriesModel, closeConnection}