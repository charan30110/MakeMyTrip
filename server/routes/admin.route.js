const express=require('express')
const routes=express.Router()
const {newRoute, viewRoute} = require('../controllers/admin.controller')

routes.post('/newRoute',newRoute)
routes.post('/viewRoute',viewRoute)

module.exports=routes