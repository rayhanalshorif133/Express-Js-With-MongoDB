const express = require('express');
const router = express.Router();

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
    res.send('Hello World!');
});
// Create a Todo
router.post('/', async (req, res) => {
    res.send('Hello World!');
});

// Create a multiple Todo
router.post('/all', async (req, res) => {
    res.send('Hello World!');
});

// Update a Todo
router.put('/:id', async (req, res) => {
    res.send('Hello World!');
});

// Delete a Todo
router.delete('/:id', async (req, res) => {
    res.send('Hello World!');
});