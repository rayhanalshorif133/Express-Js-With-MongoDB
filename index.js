const express = require('express');
const app = express();


const { client } = require('./dataBase');

app.get('/', (req, res) => {
    console.log(client);
    res.send('Hello Worldsd!');
});



app.listen(3000, () => console.log('Server running on port 3000'));