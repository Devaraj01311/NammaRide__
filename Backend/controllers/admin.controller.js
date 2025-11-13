// controllers/admin.controller.js
require('dotenv').config(); // at the top of your file
const Admin = require('../models/admin.model');
const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model');
const rideModel = require('../models/ride.model');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');




module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) 
      return res.status(400).json({ message: 'Email and password required' });

    // Compare with environment variables
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // sign JWT
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // send cookie
    res.cookie('token', token, { httpOnly: true });
    res.json({
      token,
      admin: { email, role: 'admin' }
    });
  } catch (err) {
    console.error('admin login error', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// DASHBOARD STATS
module.exports.getDashboard = async (req, res) => {
  try {
    // quick stats
    const usersCount = await userModel.countDocuments();
    const captainsCount = await captainModel.countDocuments();
    const ridesCount = await rideModel.countDocuments();
    const completedRides = await rideModel.countDocuments({ status: 'completed' });

    // total earnings across rides
    const earningsAgg = await rideModel.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, totalEarnings: { $sum: "$fare" } } }
    ]);
    const totalEarnings = earningsAgg[0]?.totalEarnings || 0;

    res.json({ usersCount, captainsCount, ridesCount, completedRides, totalEarnings });
  } catch (err) {
    console.error('getDashboard error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Generic pagination helper
function buildPagination(query) {
  const page = Math.max(1, parseInt(query.page || '1'));
  const limit = Math.min(100, parseInt(query.limit || '20'));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

// GET USERS (with optional search & pagination)
module.exports.getUsers = async (req, res) => {
  try {
    const { q, sort = '-createdAt' } = req.query;
    const { limit, skip } = buildPagination(req.query);
    const filter = {};
    if (q) {
      const regex = new RegExp(q, 'i');
      filter.$or = [{ 'fullname.firstname': regex }, { 'fullname.lastname': regex }, { email: regex }];
    }

    const users = await userModel.find(filter).sort(sort).skip(skip).limit(limit);
    const total = await userModel.countDocuments(filter);
    res.json({ total, page: Math.floor(skip/limit)+1, limit, users });
  } catch (err) {
    console.error('getUsers error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET CAPTAINS
module.exports.getCaptains = async (req, res) => {
  try {
    const { q, vehicleType } = req.query;
    const { limit, skip } = buildPagination(req.query);
    const filter = {};
    if (q) {
      const regex = new RegExp(q, 'i');
      filter.$or = [{ 'fullname.firstname': regex }, { 'fullname.lastname': regex }, { email: regex }, { 'vehicle.plate': regex }];
    }
    if (vehicleType) filter['vehicle.vehicleType'] = vehicleType;

    const captains = await captainModel.find(filter).sort('-createdAt').skip(skip).limit(limit);
    const total = await captainModel.countDocuments(filter);
    res.json({ total, page: Math.floor(skip/limit)+1, limit, captains });
  } catch (err) {
    console.error('getCaptains error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET RIDES (with filtering & pagination)
module.exports.getRides = async (req, res) => {
  try {
    const { status, q } = req.query;
    const { limit, skip } = buildPagination(req.query);
    const filter = {};
    if (status) filter.status = status;
    if (q) {
      const regex = new RegExp(q, 'i');
      // search by pickup/destination or user/captain id/plate
      filter.$or = [
        { pickup: regex },
        { destination: regex },
        { paymentID: regex },
      ];
      if (mongoose.Types.ObjectId.isValid(q)) {
        filter.$or.push({ user: mongoose.Types.ObjectId(q) }, { captain: mongoose.Types.ObjectId(q) });
      }
    }

    const rides = await rideModel.find(filter)
      .populate('user', 'fullname email')
      .populate('captain', 'fullname email vehicle')
      .sort('-createdAt')
      .skip(skip).limit(limit);

    const total = await rideModel.countDocuments(filter);
    res.json({ total, page: Math.floor(skip/limit)+1, limit, rides });
  } catch (err) {
    console.error('getRides error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET single user/captain/ride
module.exports.getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('getUserById', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports.getCaptainById = async (req, res) => {
  try {
    const captain = await captainModel.findById(req.params.id);
    if (!captain) return res.status(404).json({ message: 'Captain not found' });
    res.json(captain);
  } catch (err) {
    console.error('getCaptainById', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports.getRideById = async (req, res) => {
  try {
    const ride = await rideModel.findById(req.params.id).populate('user captain');
    if (!ride) return res.status(404).json({ message: 'Ride not found' });
    res.json(ride);
  } catch (err) {
    console.error('getRideById', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete operations
module.exports.deleteUser = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error('deleteUser error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports.deleteCaptain = async (req, res) => {
  try {
    await captainModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Captain deleted' });
  } catch (err) {
    console.error('deleteCaptain error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports.deleteRide = async (req, res) => {
  try {
    await rideModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ride deleted' });
  } catch (err) {
    console.error('deleteRide error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update ride status (accept/cancel/complete)
module.exports.updateRideStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['pending','accepted','ongoing','completed','cancelled'];
    if (!allowed.includes(status)) return res.status(400).json({ message: 'Invalid status' });

    const ride = await rideModel.findById(req.params.id);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });

    ride.status = status;
    if (status === 'completed' && !ride.rideEndedAt) ride.rideEndedAt = new Date();
    await ride.save();
    res.json(ride);
  } catch (err) {
    console.error('updateRideStatus error', err);
    res.status(500).json({ message: 'Server error' });
  }
};
