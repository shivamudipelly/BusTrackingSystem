const express = require('express');
const  router = express.Router();
const driverControllers = require('../controllers/driverControllers');
const jwt = require('jsonwebtoken')


const verifyUser = (req, res, next) => {
  try {
    const token = req.cookies.driver;

    if (!token) {
      return res.json({ status: false, message: 'Not Authorized' });
    }

    const decoded = jwt.verify(token, process.env.SECRETKEY);
    req.user = decoded; // Attach decoded user information to request object

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ status: false, message: 'Invalid token' });
    }
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ status: false, message: 'Token expired' });
    }
    console.error('Error verifying token:', err);
    return res.status(500).json({ status: false, message: 'Internal server error' });
  }
};



router.post('/driversignup',driverControllers.driverSignupPost);

router.post('/driverlogin', driverControllers.driverLoginPost)

router.post('/:busId', verifyUser, driverControllers.driverIdPost)


module.exports = router