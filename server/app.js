const express = require('express');
const dotenv = require("dotenv");
const app = express();
const cookieParser = require("cookie-parser");


//config file path
dotenv.config({ path: './config.env' });

//database connection path
require('./db/conn');

//convert data to json data
app.use(express.json());

//passes the cookie which is realated to user
app.use(cookieParser());

//link the router file
app.use(require('./router/auth'));


//port of the server
const PORT = process.env.PORT;

//run the app in port
app.listen(PORT, () => {
    console.log(`server is running in port ${PORT}`);
});