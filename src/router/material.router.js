const express = require("express");
const { isLoggedIn } = require('../lib/auth');
const router = express.Router();
const { mostrar, mandar, listar, actualizar, eliminar, traer} = require("../controller/material.controller");


router.get('/agregar',mostrar);
router.post('/agregar',mandar)
router.get('/listar',isLoggedIn,listar)
router.get('/editar/:id',isLoggedIn,traer)
router.post('/editar/:id',isLoggedIn,actualizar)
router.get('/eliminar/:id',isLoggedIn,eliminar)

module.exports = router;