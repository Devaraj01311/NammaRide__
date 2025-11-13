require('dotenv').config();
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');
const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model');
const Admin = require('../models/admin.model');

// -------------------- USER AUTH --------------------
const authUser = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized - No token' });

    const blacklisted = await blacklistTokenModel.findOne({ token });
    if (blacklisted) return res.status(401).json({ message: 'Unauthorized - Token is blacklisted' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    if (!user) return res.status(401).json({ message: 'Unauthorized - User not found' });

    req.user = user;
    next();
  } catch (err) {
    console.error('authUser error:', err.message);
    res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};

// -------------------- CAPTAIN AUTH --------------------
const authCaptain = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized - No token' });

    const blacklisted = await blacklistTokenModel.findOne({ token });
    if (blacklisted) return res.status(401).json({ message: 'Unauthorized - Token is blacklisted' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);
    if (!captain) return res.status(401).json({ message: 'Unauthorized - Captain not found' });

    req.captain = captain;
    next();
  } catch (err) {
    console.error('authCaptain error:', err.message);
    res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};

// -------------------- ADMIN AUTH --------------------

const authAdmin  = (req, res, next) => {
  const token = req.cookies.token; // HTTP-only cookie
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // attach admin info
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
// Export all middlewares as named exports
module.exports = { authUser, authCaptain, authAdmin };
