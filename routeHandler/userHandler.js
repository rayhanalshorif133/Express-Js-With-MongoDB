const express = require('express');
var bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
var jsonwebtoken = require('jsonwebtoken');
const router = express.Router();
const userSchema = require('../schemas/userSchema');
const User = new mongoose.model('User', userSchema);



router.post('/signup', async (req, res) => {

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = new User({
            name: req.body.name,
            userName: req.body.userName,
            password: hashedPassword,
        });
        await user.save().then(function (response) {
            res.status(200).json({
                message: "User Created Successfully!",
                data: response,
            });
        }).catch(function (error) {
            res.status(500).json({
                message: "There was a server side error!",
                error: error.message,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Sign up failed!",
            error: error.message,
        });
    }

});

router.post('/login', async (req, res) => {
    try {
       const user = await User.find({userName: req.body.userName});
       
       if(user && user.length > 0){
            const isValid = await bcrypt.compare(req.body.password, user[0].password);

            console.log(isValid);

            if(isValid){
                // generate token
                const token = jsonwebtoken.sign({
                        userName: user[0].userName,
                        id: user[0]._id,
                    },process.env.JWT_SECRET,{
                        expiresIn: '1h',
                    });

                res.status(200).json({
                    access_token: token,
                    message: "Login successful!",
                });
            }else{
                res.status(401).json({
                    message: "Authentication failed!",
                });
            }
         }else{
            res.status(401).json({
                message: "Authentication failed!",
            });
         }
    } catch (error) {
        res.status(500).json({
            message: "Sign up failed!",
            error: error.message,
        });
    }
});


module.exports = router;