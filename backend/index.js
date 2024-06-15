const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true, useUnifiedTopology: true });

// Mongoose Schema and Model
const todoSchema = new mongoose.Schema({
    title: String,
    completed: Boolean
});

const Todo = mongoose.model('Todo', todoSchema);

// Routes
app.get('/api/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post('/api/todos', async (req, res) => {
    const newTodo = new Todo({
        title: req.body.title,
        completed: false
    });
    await newTodo.save();
    res.json(newTodo);
});

app.put('/api/todos/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
});

// app.delete('/api/todos/:id', async (req, res) => {
//     await Todo.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Todo deleted' });
// });


app.delete('/api/todos/:id', async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid ObjectId' });
  }
  const deletedTodo = await Todo.findByIdAndDelete(id);
  if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
  }
  res.json({ message: 'Todo deleted' });
});


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
