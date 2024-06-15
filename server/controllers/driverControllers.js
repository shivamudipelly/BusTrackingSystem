const { isEmail } = require('validator');
const bcrypt = require('bcrypt')
const drivers = require('../models/driver');
const { createToken, handleErrors } = require('./authControllers');
const cookie = require('cookie-parser');
const busLocation = require('../models/busLocation')

const driverLoginPost = async (req, res) => {
    let { email, password } = req.body;
    const error = { email: "", password: "" };

    if (!email || !isEmail(email)) {
        error.email = "Please enter a valid email address";
    }
    if (!password) {
        error.password = "Please enter a password";
    }
    if (error.email || error.password) {
        return res.json({ "errors": error });
    }
    try {
        let driver = await drivers.findOne({ email });
        const isPasswordValid = await bcrypt.compare(password, driver.password);
        const token = createToken(driver)
        if (!driver) {
            error.email = "Email is not registerd"
        }

        if (!isPasswordValid) {
            error.password = "Enter valid password"
        }
        if (error.email || error.password) {
            return res.json({ "errors": error });
        }
        res.cookie('driver', token, {
            maxAge: 86400000,
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        });
        return res.json({ status: true, busId: driver.busId, message: 'login successfully' })
    } catch (err) {
        return res.json({ status:false,error: 'error occured' })
    }

}

const driverSignupPost = async (req, res) => {
    const { id, email, password } = req.body;

    const clientData = new drivers({ busId: parseInt(id), email, password })
    clientData.save()
        .then(savedMongeese => {
            return res.json({ status: true, message: 'login successfully' })
        })
        .catch(err => {
            const error = handleErrors(err);
            res.json({ "errors": { ...error } })
        });
}

const driverIdPost = async (req, res) => {
    const { longitude, latitude } = req.body;
    const { busId } = req.params;
    try {
        const isExists = await busLocation.findOne({ busId });
        let location;
        if (isExists) {
            location = await busLocation.findOneAndUpdate({ busId }, { longitude, latitude })
        }
        else{
            location = await busLocation({ busId, latitude, longitude });
    }
    location.save();
    res.status(200).json({
        message: 'Bus location saved successfully',
        location
    });
} catch (error) {
    console.error('Error saving bus location:', error);
    res.status(500).json({
        message: 'Error saving bus location',
        error: error.message
    });
}
}

const verifyGet = (req, res) => {
    return res.json({ status: true, message: 'authorized' })
}


module.exports = { driverLoginPost, driverSignupPost, driverIdPost, verifyGet }
