const express = require('express');
const router = express.Router();
const user = require('./user.js');
const enroll = require('./enroll.js');
const validate = require('./validate');
const room = require('./room.js');
const file = require('./file.js');
/* GET home page. */
router.post('/user',user);
router.post('/enroll',enroll);
router.post('/validate',validate);
router.post('/room',room);
router.post('/file',file);
module.exports = router;
