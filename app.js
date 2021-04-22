const express = require('express');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


module.exports = connection;

app = express()

require('dotenv').config(),


app.use('/api/users/', require('./routes/loginRoute'))
app.use('/', require('./routes/loginRoute'))

const PORT = process.env.PORT || 4000

// DB Connecting





app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`)
})