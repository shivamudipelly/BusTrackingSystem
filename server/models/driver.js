const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema({
    busId: {
        type: Number,
        required: [true, 'Please enter the Id'],
        unique: true
    },
    email :{
        type: String,
        required: [true, 'Please enter the email'],
        unique: true,
        validate: [isEmail  , "Please enter valid email"]
    },
    password:{
        type: String,
        required: [true, 'Please enter the password'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
})

Schema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const drivers = mongoose.model('Driver', Schema );

module.exports = drivers