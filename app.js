const express = require("express");
const path = require('path');
const mysql = require("mysql2");
const cors = require("cors")
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const{ promisify } = require('util');
const dotenv = require("dotenv");
const connection = require('./config/database');

connection.connect((error) => {
  if(error) {
   console.log(error)
  } else {
   console.log("MYSQL Connected ...")
  }
 });

dotenv.config({path: './.env'});
const app = express();


const publicDirectory = path.join(__dirname, './public');
//console.log(__dirname); 
app.use(express.static(publicDirectory));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.urlencoded({
  extended: true
}));

app.use(session({
  key: "userId",
  secret: "pass",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 *24 * 24,
  },
})
);


app.use('/', require('./routes/loginRoute'));

app.post('/Login', async (req, res) => {
  console.log("I came through")
  try {
    const { email, password } = req.body;
    //console(email)
    if(!email || !password) {
      return res.send({
        message: 'Please provide an email and password'
      });
    } 

    connection.query('SELECT * FROM user WHERE email = ?', [email], async(error, results) => {
    console.log(results);
      if(error) {
        throw error;
      }
      if (results.length < 1 || !(await bcrypt.compare(password, results[0].password))) {
       res.send({
        message: 'The email or password is incorrect'
       })
      }
      else {
        console.log("helllo")
        req.session.user = results;
        res.send(results)
      }
    });
  } catch (error) {
    console.log(error);
  }
}) 

app.get("/Login", (req, res) => {
  //console.log(req.session.user)
  if(req.session.user) {
    console.log(req.session.user[0].name);
    res.send({loggedIn: true, user: req.session.user});
  } else {
    res.send({loggedIn: false});
  }
})



// Hoan Code
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();        

const {
  loadShelterController
} = require('./controllers/shelterController');

app.use('/api', router);
router.route('/shelters').get(loadShelterController);
// router.route('/shelters/:id').get(loadEventControllerById);
// Hoan Code

app.listen(5000,() => {
   console.log("Server started on Port 5000");
})

