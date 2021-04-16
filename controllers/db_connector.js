var db = require('./app.js');

exports.db_connector = (req, res) => {
    db.query("SELECT name, address FROM customers", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.json({
            result
        })
      });
    
};