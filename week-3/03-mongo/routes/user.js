const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");

const {User, Course} = require('../db/index')

// User Routes
router.post('/signup', (req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;

    User.create({
        username,
        password
    })
    .then(function(){
        res.json({
            message: 'User created successfully' 
        })
    })
});

router.get('/courses', (req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;

    const requiredUser = User.find({
        username : username
    })

    res.status(200).json({
        Courses : requiredUser.purchasedCourses
    })

});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const username = req.headers.username;
    const courseId = req.params.courseId;

    await User.updateOne({
        username :username
    },{
        "$push" : {
            purchasedCourses : courseId
        }
    })

    res.status(200).json({
        msg : "Purchase Complete"
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