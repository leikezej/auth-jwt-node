const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
var logger = require('morgan');

const app = express();
app.use(logger('dev'));

app.use(
  cookieSession({
    name: "jepski-sessions",
    secret: "Secret_Vice66", 
    // keys: ['rat1', 'rat2'],
    httpOnly: true
  })
);


// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./jep/models/index");
const Role = db.role;

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Ok nice. Backend is LIVE 🙄🙄" });
});

// routes
require('./jep/routes/auth.routes')(app);
require('./jep/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// db.sequelize.sync();

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}