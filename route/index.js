const express = require('express');
const router = express.Router();
const user = require('./user.js');
const enroll = require('./enroll.js');
const validate = require('./validate');
/* GET home page. */
router.post('/user',user);
router.post('/enroll',enroll);
router.post('/validate',validate);
module.exports = router;
