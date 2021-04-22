const express = require('express');
router = express.Router(),

loginRoute = require('../controllers/loginController')
loginDB = require('../controllers/db_connector')
router.get('/', loginRoute.loginController)
router.get('/db/', loginDB.db_connector)

module.exports = router;