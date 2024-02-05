const express = require('express')
const zod = require('zod');
const { User, Account } = require("../db/db");
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require('../userMiddleware/middleware');
const router = express.Router()

const signupBody = zod.object({
    username: zod.string().email(),
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string()
})

router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const data = await User.findOne({
        username: req.body.username
    });

    if (data) {
        return res.status(411).json({
            message: "Email already taken/ Icorrect inputs"
        })
    }

    const user = await User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
        username: req.body.username
    })

    const userId = user._id


    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })


    const jwtoken = jwt.sign({ userId }, JWT_SECRET)


    res.json({
        message: "User created successfully",
        token: jwtoken
    })

})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})
router.post('/signin', async (req, res) => {
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "incorrect inputs"
        })
    }
    try {
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        })
        const userId = user._id;
        if (!user) {
            res.status(411).json({
                message: "Error while logging in"
            })
            return
        }
        const jwtoken = jwt.sign({ userId }, JWT_SECRET);

        res.json({
            token: jwtoken
        })

    } catch (err) {
        res.status(403).json({
            err
        })
    }
})

const updateBody = zod.object({
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
    password: zod.string().optional()
})
router.put('/', authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Error while updating information"
        })
    }
    const { userId } = req.userId;
    User.updateOne({
        _id: userId
    })


    res.json({
        message: "Updated Successfully"
    })
})

router.get('/bulk', async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstname: {
                "$regex": filter
            }
        }, {
            lastname: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstname: userfirstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })

})


module.exports = router

