const express=require('express')
const routes=express.Router()
const {checkUser,register} = require('../controllers/login.controller')

routes.post('/login',checkUser);
routes.post('/register',register);

module.exports=routes