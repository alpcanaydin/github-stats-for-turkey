const express = require('express');

const router = express.Router();

const homeCtrl = require('./controller/home');
const initialCtrl = require('./controller/initial');
const locationCtrl = require('./controller/location');
const userCtrl = require('./controller/user');

router.get('/', homeCtrl);
router.get('/initial', initialCtrl);
router.get('/location/:location', locationCtrl);
router.get('/user/:username', userCtrl);

module.exports = router;
