require('dotenv').config()

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

    const info = await transporter.sendMail(message);
}


const createToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.SECRETKEY, { expiresIn: '24h' });
}

const handleErrors = (err) => {
    let error = { name: "", email: "", password: "" }
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            error[properties.path] = properties.message;
        })
    }
    if (err.code) {
        error.email = err.keyValue.email ? 'Email already registered' : ''
        error.name = err.keyValue.name ? 'Name is not available' : ''
    }
    return error
}

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

        //jwt token creation
        const token = createToken(user);

        res.cookie('user', token, {
            maxAge: 86400000,
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        });
        return res.json({ status: true, message: 'login successfully!', user: ['user', token] })
    } catch (err) {
        console.error(err);
        return res.json({ status: false, message: 'login Failed!' })
        res.status(500).json({ errors: "Internal server error" });
    }
};


const signupPost = async (req, res) => {
    const { name, email, password } = req.body;
    const clientData = new User({ name, email, password })
    clientData.save()
        .then(savedMongeese => {
            return res.json({ status: true, message: 'Signup successfully!' })
        })
        .catch(err => {
            const error = handleErrors(err);
            res.json({ "errors": { ...error } })
        });
}

const forgotPasswordPost = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ errors: { email: "User is not registerd" } })
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRETKEY, { expiresIn: '5m' });
        const message = {
            from: process.env.EMAIL,
            to: email,
            subject: "Hello ✔",
            text: "Hello world?",
            html: `<b>https://bustracking-seven.vercel.app/user/resetpassword/${token}</b>`
        }

        let eamilResponse = sendEmail(message);

        return res.json({ status: true, message: `${eamilResponse}` })

    } catch (err) {
        console.log(err);
        return res.json({ message: 'email not sent' })
    }
}

const resetPasswordPost = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.SECRETKEY)
        const id = decoded.id;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);
        
        const user = await User.updateOne({ _id: id }, { password: hashPassword })
        console.log(user);
        if (user) {
            return res.json({ staus: true, message: 'Reset Password Successfully!' })
        } else {
            return res.json({ staus: false, message: 'Reset Password Failed' })
        }
    } catch (err) {
        return res.json({ staus: false, message: 'Reset Password Failed' })
    }


}

const isLoginGet = (req, res)=>{
    try{
        const user = req.cookies.user;
        if(!user){
            return res.json({staus: false, message: 'no token'})
        }
        jwt.verify(user, process.env.SECRETKEY,(err, decoded)=>{
            if(err){
                return res.json({ isLoggedIn: false})
            }else{
                return res.json({ isLoggedIn: true})
            }
        });
    }catch(err){
        return res.json(err);
    }
}

const logoutGet = (req, res) => {
    res.clearCookie('user')
    const user = req.cookies.user;
    if(!user)
        return res.json({ status: true, message:'Logout Successfully!' })
    else
        return res.json({ status: false, message:'Logout Failed!' })
}

const mapGet = async (req, res) => {
    let { busId } = req.params;

    try {
        const location = await busLocation.findOne({ busId: parseInt(busId) });
        if (location) {
            return res.json({ status: true, location: { latitude: location.latitude, longitude: location.longitude } });
        } else {
            return res.json({ status: false });
        }
    } catch (error) {
        return res.status(500).json({ status: false, error: 'Internal server error' });
    }
}



module.exports = { isLoginGet, mapGet, loginPost, signupPost, forgotPasswordPost, resetPasswordPost, logoutGet, createToken, handleErrors }
