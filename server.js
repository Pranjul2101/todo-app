require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const Todo = require('./models/Todo');
const app = express()
app.use(express.json());
app.use(express.static('public'))

mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err))

app.get('/',(req,res)=>{
    res.send('Hello from My Server !')
})

app.post('/todos', async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        completed: false
    })
    await todo.save()
    res.json(todo)
})

app.get('/todos', async (req, res) => {
    const todos = await Todo.find()
    res.json(todos)
})
app.delete('/todos/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id)
    res.json({ message: 'Todo deleted' })
})

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000')
})