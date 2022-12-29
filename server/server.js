const express = require("express");
const cors = require('cors')
const cookieParser = require('cookie-parser')
require("./config/mongooseConfig");
require('dotenv').config()
const app = express();

app.use(express.json(), express.urlencoded({ extended: true }));

app.use(cookieParser())
app.use(cors({credentials:true, origin:'http://localhost:3000'}))
require('./routes/albumRoutes')(app)
require('./routes/userRoutes')(app)
    
app.listen(8000, () => console.log("The server is all fired up on port 8000"));