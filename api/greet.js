const mongoose = require('mongoose');


export default function handler(req, res) {
    console.log(mongoose);
    res.status(200).json({ message: 'Hello, welcome to my Express app!' });
}
