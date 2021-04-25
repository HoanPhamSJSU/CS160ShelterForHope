const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const{ promisify } = require('util');
const dotenv = require("dotenv");


const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'cs160db',
  port:'5000',
});

exports.login = async (req, res) => {
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
        req.session.user = results;
        res.send({loggedIn: true, user:req.session.user});
       // console.log(req.session.user);
        //console.log(req.session.user)
        //const id = results[0].id;
        //const token = jwt.sign({id}, //process.env.JWT_SECRET, {
       //   expiresIn: process.env.JWT_EXPIRES_IN
       // });

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
        //res.send({
        //  message: 'Successful Login'
        // })
      }
    });
  } catch (error) {
    console.log(error);
  }
}

exports.register = (req, res) => {
  console.log(req.body);

  const{ name, email, password, passwordconfirm } = req.body;
  
  db.query('SELECT email FROM userdata WHERE email = ?', [email], async (error, results) => {
    if(error) {
      console.log(error);
    }
    if(results.length > 0) {
      res.send({
       message:
     'Email is already in use, please try another email'
     });
    } else if ( password !== passwordconfirm) {
      res.send({
        message: 'Passwords do not match, try again'
     });
    }
    else {
      let hashedPassword = await bcrypt.hash(password, 8);
      console.log(hashedPassword)
      db.query('INSERT INTO userdata SET ?', { name: name, email: email, password: hashedPassword}, (error, results) => {
        if(error){
          console.log(error);
        } else {
          console.log(results);
          res.send({
            message:  'Successfully Registered, you can now Login In!'
          });
       }
      });
  }
});
}

exports.accountUpdate = (req, res) => {
  console.log(req.body);
  try {
    const{curr, name, email, phone, country, state } = req.body;
    db.query('SELECT id FROM userdata WHERE email = ?', [curr], async(error, results) => {
     // console.log(results);
      if(error) {
        throw error;
      }
      if(results.length > 0) {
        try{
        let idval = await results;
        console.log(idval);
        db.query('UPDATE userdata SET name = ?,phone = ?, country = ?, state = ? WHERE id = ?', [name, phone, country, state, results[0].id], async(error, results) => {
           if(error) {
             throw error;
           } else {
            console.log(results);
            res.send({
              message:  'Successfully Registered, you can now Login In!'
            });
         }
        });
        }catch (error) {
          console.log(error);
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
}