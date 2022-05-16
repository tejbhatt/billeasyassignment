// Dotenv handy for local config & debugging
require('dotenv').config()

// Core Express & logging stuff
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const errorHandler = require('./src/middleware/error-handler')
const { sequelize } = require("./models");

const app = express()

const path = require("path");



// Logging
app.use(logger('dev'))


//cors
const cors = require('cors')
const helmet = require('helmet')
app.use(
cors({
origin: (origin, callback) => callback(null, true),
credentials: true,
})
);

app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  //    next();


   // Website you wish to allow to connect
   res.setHeader('Access-Control-Allow-Origin', '*');

   // Request methods you wish to allow
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

   // Request headers you wish to allow
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

   // Set to true if you need the website to include cookies in the requests sent
   // to the API (e.g. in case you use sessions)
   res.setHeader('Access-Control-Allow-Credentials', true);

   // Pass to next layer of middleware
   next();  
});

//wearing a helmet 

app.use(helmet());

// Parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, "/public/assets")));

// Routes & controllers
app.get("/", (req, res) => res.json({ msg: " Welcome to Employee  Api" }));
app.use("/api", require("./src/routes/routes"));



// app.use("/admin", require("./src/routes/admin"));

// Catch all route, generate an error & forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(errorHandler)


// Get values from env vars or defaults where not provided
//const host = '0.0.0.0';
const PORT = process.env.PORT || 3000;




// Start the server
app.listen(PORT, async () => {
  console.log(`Server Started on port ${PORT}`);
await sequelize.authenticate();
 // console.log(__dirname)
await sequelize.sync({force:true , alter: true});
console.log("DB connected");
  

});


module.exports = app