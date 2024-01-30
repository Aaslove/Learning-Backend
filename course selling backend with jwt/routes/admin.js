const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin } = require("../db")
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

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});

module.exports = router;