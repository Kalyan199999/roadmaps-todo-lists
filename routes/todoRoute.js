const express = require('express')

const Verification = require('../middlewares/userVerification')

const { 
    getAll,
    additem,
    getItemById
} = require('../controllers/todoController')

const route = express.Router()

route.get('/' , getAll);

route.post('/add' , Verification , additem )

route.get('/:id' , Verification , getItemById)

module.exports = route;