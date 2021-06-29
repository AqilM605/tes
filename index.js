require('dotenv').config('.env');
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./src/app/models');
const passport=require('./src/app/middleware/auth').passport

var corsOptions = {
  origin: process.env.CORS,
};

// cors setup for app
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));



// app.use(passport.session());

// connect to mongo DB
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database! \n', err);
    process.exit();
  });

// route section
require('./src/app/routes/users.routes')(app);
require('./src/app/routes/group.routes')(app);
require('./src/app/routes/auth.routes')(app);


module.exports = app
