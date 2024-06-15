const express = require('express');
const  router = express.Router();
const driverControllers = require('../controllers/driverControllers');
const jwt = require('jsonwebtoken')

const verifyUser = async (req, res, next)=>{
    try{
        const d = req.cookies.driver;
        if(!d){
            return res.json({staus: false, message: 'no token'})
        }
        await jwt.verify(d, process.env.SECRETKEY);
            next()
    }catch(err){
        console.log(err);
        return res.json(err)
    }
}

router.post('/driversignup',driverControllers.driverSignupPost);

router.post('/driverlogin', driverControllers.driverLoginPost)

router.post('/:busId', verifyUser, driverControllers.driverIdPost)

router.get('/verify', verifyUser, driverControllers.verifyGet )

module.exports = router