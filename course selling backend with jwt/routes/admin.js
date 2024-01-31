const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db")
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config")
const router = Router();

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    Admin.create({
        username: username,
        password: password
    })

    res.json({
        msg: "Admin is created sucessfully"
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const user = await Admin.findOne({
        username: username,
        password: password
    });
    if (user) {
        const token = await jwt.sign({
            username: username
        }, JWT_SECRET)
        res.json({
            token: token
        })

    } else {
        res.status(411).json({
            msg: "invalid credentials"
        })
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const courseDetails = req.body;
    const Courses = await Course.create({
        title: courseDetails.title,
        description: courseDetails.description,
        price: courseDetails.price,
        imageLink: courseDetails.imageLink
    });
    res.json({
        msg: "Course created sucessfully",
        CourseId: Courses._id
    })

});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const allCourse = await Course.find({});
    res.json({
        courses: allCourse
    })
});

module.exports = router;