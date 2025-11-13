// models/admin.model.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['admin', 'superadmin'], default: 'admin' },
}, { timestamps: true });

adminSchema.methods.comparePassword = async function (plain) {
  return bcrypt.compare(plain, this.password);
};

adminSchema.statics.hashPassword = async function (plain) {
  return bcrypt.hash(plain, 10);
};

adminSchema.methods.generateAuthToken = function () {
  return token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

};

module.exports = mongoose.model('admin', adminSchema);
