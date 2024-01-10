const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const jwt = require('jsonwebtoken');
const secretKey = require('../config')
const { Admin,User,Course }=require('../db/index');

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    Admin.create({
        username,
        password
    }).then(()=>{
        res.status(201).json({
            message:"Admin created successfully"
        })
    });

});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const requiredAdmin = await Admin.findOne({
        username,
        password
    })

    console.log(requiredAdmin.username);

    if(requiredAdmin.username){
        const token = jwt.sign({
            username : username
        },secretKey);
        res.json({
            token : token
        })
    }else{
        res.status(411).json({
            message : "Incorrect username or password"
        })
    }

});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    Course.create({
        title,
        description,
        price,
        imageLink
    }).then((newCourse)=>{
        res.json({
            message : "New Course created",
            courseId : newCourse._id
        })
    })

});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const allCourses = await Course.find({});
    res.json({
        AllCourses : allCourses
    })

});

module.exports = router;