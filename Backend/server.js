require('dotenv').config(); // ✅ Load .env before anything else
const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./socket');
const port = process.env.PORT || 5003; // match your .env port

const server = http.createServer(app);

initializeSocket(server);

server.listen(port, () => {
  console.log(` Server is running on port ${port}`);
  console.log(` JWT_SECRET: ${process.env.JWT_SECRET}`); // optional check
});
