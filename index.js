const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./routeHandler/todoHandler');

// Express app initialization
const app = express();
app.use(express.json());


// Database connection with mongoose
const url = "mongodb+srv://rayhan133:rayhan133@cluster0.jymenap.mongodb.net/todo?retryWrites=true&w=majority";
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB...');
        return true;
    }
    )
    .catch(err => console.error('Could not connect to MongoDB...'));

// Application Routes
app.use("/todo", todoHandler);
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
});