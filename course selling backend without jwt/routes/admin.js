const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();



// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    // const userfind = await Admin.findOne({
    //     username: username
    // })
    // if (userfind) {
    //     res.status(403).json({
    //         msg: "user already exists"
    //     })
    // }

    Admin.create({
        username: username,
        password: password
    })

    res.status(200).json({
        msg: "Admin created suscessfully"
    })

});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const courseDetails = req.body;
    const newCourse = await Course.create({
        title: courseDetails.title,
        description: courseDetails.description,
        price: courseDetails.price,
        imageLink: courseDetails.imageLink
    })

    res.status(200).json({
        "msg": "course created susessfully",
        "Course_id": newCourse._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const allCourses = await Course.find({});
    res.status(200).json({
        courses: allCourses
    })
});

module.exports = router;