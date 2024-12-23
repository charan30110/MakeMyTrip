const express=require('express')
const routes=express.Router()
const {view, book, cancel} = require('../controllers/customer.controller')
const {viewRoute} = require('../controllers/admin.controller')

routes.post('/view',view)
routes.post('/book',book)
routes.post('/cancel',cancel)
routes.post('/viewRoute',viewRoute)

module.exports=routes