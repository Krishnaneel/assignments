const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User,Course } = require('../db/index')
const secretKey = require('../config')
const jwt = require('jsonwebtoken')

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic

    const username = req.body.username;
    const password = req.body.password;

    const response = await User.create({
        username,
        password
    })

    if(response){
        res.json({
            message: "User created successfully"
        })
    }else{
        res.json({
            message : "User not created"
        })
    }

});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic

    const username = req.body.username;
    const password = req.body.password;
    
    const requiredUser = await User.findOne({
        username,
        password
    })

    if(requiredUser){
        const token = jwt.sign({
            username
        },secretKey)
        res.json({
            token
        })
    }else{
        res.json({
            message : "No such user exists"
        })
    }

});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic

    const allCourses = await Course.find({})

    res.json({
        allCourses
    })

});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

    const requiredUser = await User.findOne({
        username
    })

    const response = await User.updateOne({
        username
    },{
        "$push" : {
            purchasedCourses : courseId
        }
    })
    
    res.json({
        message : "Purchase Completed Successfully"
    })

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic

    const username = req.headers.username;

    const user = await User.findOne({
        username
    })

    const purchasedCourses = await Course.find({
        _id : {
            "$in" : user.purchasedCourses
        }
    })

    res.status(200).json({
        UsersCourses : purchasedCourses
    })

});

module.exports = router