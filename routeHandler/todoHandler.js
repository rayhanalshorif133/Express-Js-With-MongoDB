const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../schemas/todoSchema');
const Todo = new mongoose.model('Todo', todoSchema);




// Get All the Todo
router.get('/', async (req, res) => {
    await Todo.find({})
    .select({
        _id: 0,
        __v: 0,
        date: 0,
    })
    // .limit(2)
    .then(function (response) {
        res.status(200).json({
            data: response,
            message: "All Todos",
        });
    }).catch(function (error) {
        res.status(500).json({
            message: "There was a server side error!",
            error: error.message,
        });
    });
});


// Get a specific Todo
router.get('/:id', async (req, res) => {
    await Todo.find({
        _id: req.params.id,
    })
        .then(function (response) {
            res.status(200).json({
                data: response,
                message: "All Todos",
            });
        }).catch(function (error) {
            res.status(500).json({
                message: "There was a server side error!",
                error: error.message,
            });
        });
});

// Create a Todo
router.post('/', async (req, res) => {
    await Todo.collection.insertOne(req.body).then(function () {
        res.status(200).json({
            message: "Todo was inserted successfully",
        });
    }).catch(function (error) {
        res.status(500).json({
            message: "There was a server side error!",
            error: error.message,
        });
    });
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
    await Todo.findByIdAndUpdate({ _id: req.params.id }, {
        $set: req.body
    },{
        useFindAndModify: true,
        new: true,
    })
    .then(function (response) {
        res.status(200).json({
            data: response,
            message: "Todo was updated successfully",
        });
    }).catch(function (error) {
        res.status(500).json({
            message: "There was a server side error!",
            error: err.message,
        });
    });

});

// Delete a Todo
router.delete('/:id', async (req, res) => {
    await Todo.deleteOne({ _id: req.params.id },{
        useFindAndModify: true,
    }).then(function (response) {
        res.status(200).json({
            data: response,
            message: "Todo was deleted successfully",
        });
    })
    .catch(function (error) {
        res.status(500).json({
            message: "There was a server side error!",
            error: err.message,
            });
    });
});

// Delete a multiple Todo
router.delete('/', async (req, res) => {
    await Todo.deleteMany({status:"active"}).then(function (response) {
        res.status(200).json({
            data: response,
            message: "TodoS ware deleted successfully",
        });
    }).catch(function (error) {
        res.status(500).json({
            message: "There was a server side error!",
            error: err.message,
        });
    });
});


module.exports = router;