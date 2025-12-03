const express = require('express');
const { Mostrar, mandar } = require('../controller/inicio.controller');
const { isLoggedIn } = require('../lib/auth');

const router = express.Router();

router.get ('/inicio',isLoggedIn, Mostrar)
router.post ('/inicio',isLoggedIn, mandar)

module.exports = router
