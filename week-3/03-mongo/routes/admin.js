const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();

const {Admin} = require('../db/index');
const {Course} = require('../db/index');

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    Admin.create({
        username,
        password
    })
    .then(function(){
        res.status(200).json({
            msg : "Admin resgistered successfully"
        })
    })
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic

    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    Course.create({
        title,
        description,
        imageLink,
        price
    }).then(function(newCourse){
        res.status(200).json({
            message: 'Course created successfully',
            courseId: newCourse._id
        })
    })

});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic

    const allCourse = await Course.find({});
    res.json({
        allCourses : allCourse
    })

});

module.exports = router;