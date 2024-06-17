require('dotenv').config();

const User = require('../models/user');
const busLocation = require('../models/busLocation');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const nodemailer = require('nodemailer');

const sendEmail = async (message) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAILPASSWORD
        }
    });

    try {
        const info = await transporter.sendMail(message);
        console.log(`Email sent: ${info.messageId}`);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Propagate the error back to the caller if needed
    }
};

const createToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.SECRETKEY, { expiresIn: '24h' });
};

const handleErrors = (err) => {
    let error = { name: "", email: "", password: "" };
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            error[properties.path] = properties.message;
        });
    }
    if (err.code) {
        error.email = err.keyValue.email ? 'Email already registered' : '';
        error.name = err.keyValue.name ? 'Name is not available' : '';
    }
    return error;
};

const loginPost = async (req, res) => {
    const { email, password } = req.body;
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
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ errors: { email: "Email is not registered" } });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.json({ errors: { password: "Password didn't match" } });
        }

        const token = createToken(user);

        res.cookie('user', token, {
            maxAge: 86400000,
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        });

        console.log(`User logged in: ${user.email}`);
        return res.json({ status: true, message: 'Login successful!', user: ['user', token] });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ status: false, message: 'Login failed!' });
    }
};

const signupPost = async (req, res) => {
    const { name, email, password } = req.body;
    const clientData = new User({ name, email, password });

    try {
        await clientData.save();
        console.log(`User signed up: ${email}`);
        return res.json({ status: true, message: 'Signup successful!' });
    } catch (err) {
        const error = handleErrors(err);
        console.error('Signup error:', error);
        return res.json({ "errors": { ...error } });
    }
};

const forgotPasswordPost = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ errors: { email: "User is not registered" } });
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRETKEY, { expiresIn: '5m' });
        const message = {
            from: process.env.EMAIL,
            to: email,
            subject: "Password Reset",
            html: `<b>Reset your password here: <a href="https://example.com/reset/${token}">Reset Password</a></b>`
        };

        await sendEmail(message);
        console.log(`Password reset email sent to: ${email}`);
        return res.json({ status: true, message: 'Password reset email sent!' });

    } catch (err) {
        console.error('Forgot password error:', err);
        return res.status(500).json({ message: 'Failed to send reset email' });
    }
};

const resetPasswordPost = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.SECRETKEY);
        const id = decoded.id;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);

        const user = await User.updateOne({ _id: id }, { password: hashPassword });
        console.log(`Password reset for user ID: ${id}`);
        
        if (user) {
            return res.json({ status: true, message: 'Password reset successful!' });
        } else {
            return res.json({ status: false, message: 'Password reset failed' });
        }
    } catch (err) {
        console.error('Reset password error:', err);
        return res.json({ status: false, message: 'Password reset failed' });
    }
};

const isLoginGet = (req, res) => {
    try {
        const user = req.cookies.user;
        if (!user) {
            return res.json({ status: false, message: 'No token found' });
        }
        jwt.verify(user, process.env.SECRETKEY, (err, decoded) => {
            if (err) {
                console.error('JWT verification error:', err);
                return res.json({ isLoggedIn: false });
            } else {
                return res.json({ isLoggedIn: true });
            }
        });
    } catch (err) {
        console.error('Error getting login status:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const logoutGet = (req, res) => {
    try {
        // Logging the user cookie for debugging
        const userCookie = req.cookies.user; // Access the user cookie correctly
        console.log('User cookie before logout:', userCookie);

        if (!userCookie) {
            console.log('No user cookie found. User might already be logged out.');
            return res.json({ status: false, message: 'No user logged in' });
        }

        // Clear the user cookie
        res.clearCookie('user', { path: '/' });

        // Confirm cookie clearance for debugging
        const clearedCookie = req.cookies.user;
        console.log('User cookie after logout:', clearedCookie);

        // Send a success response
        return res.json({ status: true, message: 'Logout successful!' });
    } catch (err) {
        // Log and send an error response
        console.error('Logout error:', err);
        return res.json({ status: false, message: 'Logout failed' });
    }
};


const mapGet = async (req, res) => {
    let { busId } = req.params;

    try {
        const location = await busLocation.findOne({ busId: parseInt(busId) });
        if (location) {
            console.log(`Bus location found: ${location.latitude}, ${location.longitude}`);
            return res.json({ status: true, location: { latitude: location.latitude, longitude: location.longitude } });
        } else {
            console.log(`Bus location not found for ID: ${busId}`);
            return res.json({ status: false });
        }
    } catch (error) {
        console.error('Map route error:', error);
        return res.status(500).json({ status: false, error: 'Internal server error' });
    }
};

module.exports = { isLoginGet, mapGet, loginPost, signupPost, forgotPasswordPost, resetPasswordPost, logoutGet, createToken, handleErrors };
