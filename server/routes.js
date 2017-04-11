const express = require('express');

const router = express.Router();

const homeCtrl = require('./controller/home');
const initialCtrl = require('./controller/initial');
const locationStatsCtrl = require('./controller/locationStats');
const locationCtrl = require('./controller/location');
const userCtrl = require('./controller/user');
const languageCtrl = require('./controller/language');

router.get('/', homeCtrl);
router.get('/initial', initialCtrl);
router.get('/location-stats', locationStatsCtrl);
router.get('/location/:location', locationCtrl);
router.get('/user/:username', userCtrl);
router.get('/language/:language', languageCtrl);

module.exports = router;
