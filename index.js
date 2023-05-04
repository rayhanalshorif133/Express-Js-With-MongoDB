const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const todoHandler = require('./routeHandler/todoHandler');
const userHandler = require('./routeHandler/userHandler');

// Express app initialization
const app = express();
dotenv.config();
app.use(express.json());


// Database connection with mongoose
// const url = "mongodb+srv://rayhan133:rayhan133@cluster0.jymenap.mongodb.net/todo?retryWrites=true&w=majority";
const url = "mongodb+srv://rayhanalshorif133:rayhanalshorif133@cluster0.rfh2hxh.mongodb.net/todo_app?retryWrites=true&w=majority";

const dataBaseConnection = (async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error('Could not connect to MongoDB...')
    }
});

// Application Routes
app.use("/todo", todoHandler);
app.use("/user", userHandler);
app.use(errorHandler);


// Default error handler

function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
};


app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
    dataBaseConnection();
});