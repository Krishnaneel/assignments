const jwt = require('jsonwebtoken')
const secretKey = require('../config')

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

    const auth = req.headers.authorization.split(" ");
    const token = auth[1];

    try{
        const response = jwt.verify(token,secretKey)
        if(response){
            req.headers.username = response.username
            next();
        }else{
            res.json({
                message : "Authorization unsuccessful"
            })
        }
    }catch(err){
        res.json({
            message : "Invalid Json"
        })
    }

}

module.exports = userMiddleware;