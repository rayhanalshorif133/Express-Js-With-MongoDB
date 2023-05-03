const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../schemas/todoSchema');
const Todo = new mongoose.model('Todo', todoSchema);




// Get All the Todo
router.get('/', async (req, res) => {
    res.send('Hello World!');
});


// Get a specific Todo
router.get('/:id', async (req, res) => {
    res.send('Hello World!');
});

// Create a Todo
router.post('/', async (req, res) => {
    try {
        const newTodo = new Todo(req.body);
        await newTodo.save();
            res.status(200).json({
                message: "Todo was inserted successfully",
            });
        } catch (err) {
            res.status(500).json({
                message: "There was a server side error!",
                error: err.message,
            });
        }
});

// Create a multiple Todo
router.post('/all', async (req, res) => {
    await Todo.insertMany(req.body).then(function () {
        res.status(200).json({
            message: "Todos were inserted successfully",
        });
    }).catch(function (error) {
        res.status(500).json({
            message: "There was a server side error!",
            error: err.message,
        });
    });
});

// Update a Todo
router.put('/:id', async (req, res) => {
    res.send('Hello World!');
});

// Delete a Todo
router.delete('/:id', async (req, res) => {
    res.send('Hello World!');
});


module.exports = router;