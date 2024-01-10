// Middleware for handling auth
const { response } = require('express');
const secretKey = require('../config')
const jwt = require('jsonwebtoken');

function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const header = req.headers.authorization
    const auth = header.split(" ");
    const token = auth[1];

    try{
        const response = jwt.verify(token,secretKey);
        if(response.username){
            next();
        }else{
            res.json({
                message : "Authorization unsuccessful"
            })
        }
    }catch(e){
        res.json({
            message:"Invalid Json"
        })
    }

}

module.exports = adminMiddleware;