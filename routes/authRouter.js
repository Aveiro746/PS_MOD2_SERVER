const bcrypt = require('bcrypt')
const express = require ('express')
const User = require('../Schemas/UserSchema')
const jwt = require('../middleware/jwt')
const authRouter = express.Router()

authRouter.get('/' ,(req , res)=>{
    res.status(200).json({message: "AUTH ONLINE!"})
})



authRouter.post('/login' , (req , res)=>{
    res.status(200).json({message: "Login Route"})
})



authRouter.post('/register' , (req , res)=>{
    res.status(200).json({message: "Register Route"})
})

module.exports = authRouter