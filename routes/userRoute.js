const express = require('express')
const {
    getUsers,
    register,
    login
} = require('../controllers/userController')

const verification = require('../middlewares/userVerification')

const route = express.Router()

route.get( "/" , getUsers )
route.post( "/register" , register )
route.post( "/login" , login )

module.exports = route;