const express = require('express');
const router = express.Router();
const user = require('./user.js');
const enroll = require('./enroll.js');
/* GET home page. */
router.post('/user',user);
router.post('/enroll',enroll);
module.exports = router;
