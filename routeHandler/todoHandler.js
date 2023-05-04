const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../schemas/todoSchema');
const Todo = new mongoose.model('Todo', todoSchema);
const checkLogin = require('../middlewares/checkLogin');




// Get login user's todo's

router.get('/me', checkLogin, async (req, res) => {
    try {
        const data = await Todo.find({})
            .populate("userId", "name userName")
            .select({ _id: 0, __v: 0, date: 0 });
        res.status(200).json({
            data: data,
            message: "All Todos",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "There was a server side error!",
            error: error.message,
        });
    }
});


// Get All the Todo
router.get('/', checkLogin, async (req, res) => {
    try {
        const data = await Todo.find({}).select({ _id: 0, __v: 0, date: 0 });
        res.status(200).json({
            data: data,
            message: "All Todos",
        });
    } catch (error) {
        res.status(500).json({
            message: "There was a server side error!",
            error: error.message,
        });
    }
});

// query helper

router.get('/query/:lang', async (req, res) => {


    const data = await Todo.find().byLanguage(req.params.lang);
    res.status(200).json({
        data: data,
        message: "All Todos",
    });
});


// Static routes
router.get('/static', async (req, res) => {
    const data = await Todo.findByJs();

    res.status(200).json({
        data: data,
        message: "All Todos",
    });
});

// Get All Active Todo
router.get('/active', async (req, res) => {
    const todo = new Todo();
    await todo.findActive();
    res.status(200).json({
        data: data,
        message: "All Active Todos",
    });
});


// Get All Active using callback
router.get('/active-callback', (req, res) => {
    const todo = new Todo();
    todo.findActiveCallBack().then(function (response) {
        res.status(200).json({
            data: response,
            message: "All Active Todos",
        });
    }).catch(function (error) {
        res.status(500).json({
            message: "There was a server side error!",
            error: error.message,
        });
    });
});



// Get a specific Todo
router.get('/:id', (req, res) => {
    Todo.find({
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
router.post('/', checkLogin, async (req, res) => {
    try {
        req.body.userId = req.userId;
        const newTodo = await Todo.collection.insertOne(req.body);
        res.status(200).json({
            data: newTodo,
            message: "Todo was inserted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "There was a server side error!",
            error: error.message,
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
    await Todo.findByIdAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }, {
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
    await Todo.deleteOne({ _id: req.params.id }, {
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
    await Todo.deleteMany({ status: "active" }).then(function (response) {
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