const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const drivers = require('../models/driver');
const { createToken, handleErrors } = require('./authControllers');
const cookie = require('cookie-parser');
const busLocation = require('../models/busLocation');

const driverLoginPost = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate input
        if (!email || !isEmail(email)) {
            return res.status(400).json({ errors: { email: "Please enter a valid email address" } });
        }
        if (!password) {
            return res.status(400).json({ errors: { password: "Please enter a password" } });
        }

        // Find driver by email
        let driver = await drivers.findOne({ email });

        if (!driver) {
            return res.status(400).json({ errors: { email: "Email is not registered" } });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, driver.password);

        if (!isPasswordValid) {
            return res.status(400).json({ errors: { password: "Invalid password" } });
        }

        // Generate JWT token
        const token = createToken(driver);

        // Set HTTP-only cookie
        res.cookie('driver', token, {
            maxAge: 86400000, // 24 hours in milliseconds
            httpOnly: true,
            secure: true, // For HTTPS only, remove for development on HTTP
            sameSite: 'None' // Adjust based on your deployment requirements
        });

        // Log successful login
        console.log(`Driver logged in: ${driver.email}`);

        // Respond with success message and busId
        return res.json({ status: true, busId: driver.busId, message: 'Login successful' });

    } catch (err) {
        // Handle server errors
        console.error('Driver login error:', err);
        return res.status(500).json({ status: false, error: 'Error occurred during login' });
    }
};


const driverSignupPost = async (req, res) => {
    const { id, email, password } = req.body;

    const clientData = new drivers({ busId: parseInt(id), email, password });

    try {
        await clientData.save();
        console.log(`Driver signed up: ${email}`);
        return res.json({ status: true, message: 'Signup successful' });
    } catch (err) {
        const error = handleErrors(err);
        console.error('Driver signup error:', error);
        return res.json({ "errors": { ...error } });
    }
};

const driverIdPost = async (req, res) => {
    const { longitude, latitude } = req.body;
    const { busId } = req.params;

    try {
        let location = await busLocation.findOne({ busId });

        if (!location) {
            location = new busLocation({ busId, latitude, longitude });
        } else {
            location = await busLocation.findOneAndUpdate({ busId }, { longitude, latitude });
        }

        await location.save();

        console.log(`Bus location saved for bus ID ${busId}`);
        return res.status(200).json({
            status: true,
            message: 'Bus location saved successfully',
            location
        });

    } catch (error) {
        console.error('Error saving bus location:', error);
        return res.status(500).json({
            message: 'Error saving bus location',
            error: error.message
        });
    }
};



module.exports = { driverLoginPost, driverSignupPost, driverIdPost };
