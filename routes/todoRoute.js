const express = require('express')

const Verification = require('../middlewares/userVerification')

const { 
    getAll,
    additem,
    getItemById,
    update
} = require('../controllers/todoController')

const route = express.Router()

route.get('/',Verification , getAll);

route.post('/add' , Verification , additem )

route.get('/:id' , Verification , getItemById)

route.patch('/update/:id' , update)

module.exports = route;