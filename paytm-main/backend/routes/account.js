const express = require('express');
const router = express.Router()
const { Account } = require('../db/db.js');
const { authMiddleware } = require('../userMiddleware/middleware.js');
const { default: mongoose } = require('mongoose');

module.exports = router

router.get('/balance', authMiddleware, async (req, res) => {

    const user = await Account.findOne({
        userId: req.userId
    })
    res.json({
        balance: user.balance
    })

})

router.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { to, amount } = req.body;
    const userId = req.userId;

    const account = await Account.findOne({
        userId: userId
    })

    if (amount > account.balance) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({
        userId: to
    })

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    await Account.updateOne({
        userId: userId
    }, {
        $inc: {
            balance: -amount
        }
    })

    await Account.updateOne({
        userId: to
    }, {
        $inc: {
            balance: amount
        }
    })

    await session.commitTransaction()
    res.status(200).json({
        message: "Transfer successful"
    })
})