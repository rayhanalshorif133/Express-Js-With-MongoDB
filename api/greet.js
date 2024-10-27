const mongoose = require('mongoose');


export default function handler(req, res) {
    const uri = "mongodb+srv://rayhanalshorifmongodb:8VznScZWt66XHCJ4@cluster0.hl4xe.mongodb.net/?retryWrites=true&w=majority";

    var message = "Defualt messgae";
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            message = "Successfully connected to MongoDB!";
        })
        .catch((error) => {
            message = "Connection error: " + error;
        });
    res.status(200).json({ message: message });
}
