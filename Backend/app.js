const dotenv = require('dotenv');
dotenv.config();
const path = require("path");
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.route');
const adminRoutes = require('./routes/admin.routes');

connectToDb();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    process.env.FRONTEND_URL, 
  ],
  credentials: true,
}));



console.log("JWT_SECRET:", process.env.JWT_SECRET); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps',mapsRoutes);
app.use('/rides',rideRoutes);
app.use('/admin', adminRoutes);



app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});



module.exports = app;