var mysql = require('mysql2')
var connection = mysql.createConnection({
  host: 'db-mysql-nyc3-32982-do-user-9122779-0.b.db.ondigitalocean.com',
  user: 'doadmin',
  password: 'p5b2nqufe74hh9px',
  database: 'CS160',
  port:'25060',
})

module.exports = connection;