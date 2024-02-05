const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://pb63827:y6cswegPSnPnS3rD@cluster0.cavtgru.mongodb.net/paytmbackend');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
        trim: true,
        lowercase: true
    },
    firstname: {
        type: String,
        required: true,
        maxLength: 30,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        maxLength: 30,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },

})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    balance: {
        type: Number,
        required: true,
        trim: true
    }
})

const User = mongoose.model("User", userSchema);
const Account = mongoose.model('Bank', accountSchema);

module.exports = {
    User,
    Account
}