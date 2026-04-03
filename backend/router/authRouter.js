const express = require('express')

const router = express.Router();

const {validate} = require('../middlewares/authmiddleware.js')

const {signup, signin, signout} = require('../controllers/auth.js')

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/signout',signout); //needs middleware

module.exports = router;