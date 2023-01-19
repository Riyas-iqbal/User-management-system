const chalk = require('chalk')
const express = require('express')
const router = express.Router()
const Jwt = require('jsonwebtoken')

const Controller = require("../Controllers/AdminController");

router
    .post('/', Controller.AdminLogin)
    .get('/users',Controller.getAllUsers )
    .get("/search/:key",Controller.searchUser )
    .delete('/user/:id',Controller.deleteUser)

module.exports = router;