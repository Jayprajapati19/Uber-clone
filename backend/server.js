const express = require("express");
const http = require("http");
const app = express();
require("dotenv").config();
const db = require("./db/db");
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const captainRoutes = require('./routes/captain.routes');
const mapRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');
const { initialiseSocket } = require("./socket");

db();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get("/", (req, res) =>{
    res.send("Hello World");
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapRoutes);
app.use('/rides', rideRoutes);

const server = http.createServer(app);

initialiseSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});