var jsonwebtoken = require('jsonwebtoken');

const checkLogin = (req, res, next) => {
    var { authorization } = req.headers;
    try {
        authorization = authorization.split(' ')[1];
        const decoded = jsonwebtoken.verify(authorization, process.env.JWT_SECRET);
        const { userName, id } = decoded;
        req.userName = userName;
        req.userId = id;
        next();
    } catch (error) {
        next("Authentication failed!");
    }
};


module.exports = checkLogin;