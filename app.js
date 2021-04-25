const express = require("express");
const path = require('path');
const mysql = require("mysql");
const cors = require("cors")
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const{ promisify } = require('util');
const dotenv = require("dotenv");

dotenv.config({path: './.env'});
const app = express();

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'cs160db',
  port:'5000',
});

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

db.connect((error) => {
 if(error) {
  console.log(error)
 } else {
  console.log("MYSQL Connected ...")
 }
});

//const publicDirectory = path.join(__dirname, './frontend');
// Define Routes
//app.use('/', require('./routes/pages'));
//app.use('/loginRoute', require('./routes/loginRoute'));
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

    db.query('SELECT * FROM userdata WHERE email = ?', [email], async(error, results) => {
     // console.log(results);
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
     //   const id = result[0].id
    //    const token = jwt.sign({id}, process.env.JWT_SECRET, {
       //   expiresIn: process.env.JWT_EXPIRES_IN
     //   });
     //   req.session.user = results;
      //  res.json({auth: true, token, results: results })
       // req.session.user = results;
        //console.log("The token is: " + token);
       /* const cookieOptions = {
          expires: new Date (
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          httpOnly: true
        }
        */
        //res.cookie('jwt', token, cookieOptions);
        //res.status(200).redirect("/");
        res.send(results)
      }
    });
  } catch (error) {
    console.log(error);
  }
}) 
/*
app.get('/isLoggedIn', verifyJWT, (req, res)=> {
  res.send("you are logged")
})

const verifyJWT = (req, res, next) => {
  const token = req.headers("x-access-token")
  if(!token) {
    res.send("We need a token")
  }
}
*/
/*
app.get("/app/dashboard", (req, res) => {
  //console.log(req.session.user)
  if(req.session.user) {
    console.log(req.session.user[0].name);
    res.send({loggedIn: true, user: req.session.user});
  } else {
    res.send({loggedIn: false});
  }
})
*/
app.get("/Login", (req, res) => {
  //console.log(req.session.user)
  if(req.session.user) {
    console.log(req.session.user[0].name);
    res.send({loggedIn: true, user: req.session.user});
  } else {
    res.send({loggedIn: false});
  }
})

//app.use('/loginRoute', require('./routes/loginRoute'));

/*
app.post('/Register', (req, res)=> {
  const{ name, email, password, passwordConfirm } = req.body;

db.query('INSERT INTO userdata SET ?', { name: name, email: email, password: password}, (error, results) => {
  if(error){
    console.log(error);
  } else {
    console.log(results);
    //return res.render('register', {
    //message: 'Succesfully Registered'
    //});
 }
});
});
*/
app.listen(5000,() => {
   console.log("Server started on Port 5000");
})

//app.get("/", function(req, res) {
//  res.send("express here");
//})

/*const express = require('express');

app = express()

//require('dotenv').config(),


//app.use('/api/users/', require('./routes/loginRoute'))
//app.use('/', require('./routes/loginRoute'))

//const PORT = process.env.PORT || 4000

app.get("/", function(req, res) {
    res.send("express here");
}

//app.use('/api/users/', require('./routes/loginRoute'))

app.use('/', require('./routes/loginRoute'))


app.listen(3001, () => {
    console.log('Listening on Port: 3001')
})
*/