const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db")

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    await User.create({
        username: username,
        password: password
    });

    res.json({
        msg: "User created susessfully"
    })
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const allCourses = await Course.find({});
    res.status(200).json({
        courses: allCourses
    })
});
router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    try {
        // Implement course purchase logic
        const courseId = req.params.courseId;
        const username = req.body.username;
        console.log(courseId);

        await User.updateOne({
            username: username
        }, {
            "$push": {
                purchasedCourse: courseId
            }
        });

        res.json({
            msg: "Course purchased successfully"
        });
    } catch (error) {
        // Handle any errors that occurred during the update operation
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers.username;
    const user = await User.findOne({
        username: username
    });
    console.log(user);
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourse
        }
    })
    console.log(courses);
    res.json({
        coures: courses
    })
});

module.exports = router