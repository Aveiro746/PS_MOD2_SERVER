const bcrypt = require('bcrypt')
const express = require ('express')
const User = require('../Schemas/UserSchema')
const {verifyJWT} = require('../middleware/jwt')
const jwt = require('jsonwebtoken')
const authRouter = express.Router()

authRouter.get('/' , verifyJWT, (req , res)=>{
    User.find((error, result)=>{
        if(error){
            res.status(404).json({message: error.message})
        }
        if(result === null || result === undefined || result === []){
            res.status(404).json({message: "NOT FOUND"})
        }
        res.status(200).json({data: result})
    })
})


// Compare password send back new token
authRouter.post('/login' , async (req , res)=>{
    let username = req.body.username
    let password = req.body.password

    User.findOne({username: username} , (err , result)=>{
       if(err){
           res.status(404).json({message: err.message})
       }
   

        bcrypt.compare(password, result.password, (err , result)=>{
            if(err){
                res.status(400).json({message: err.message})
            }

            if(result === false){
                res.status(403).json({message: "You must be logged in"})
            }
            let token = jwt.sign(username , process.env.JWT_SECRET)
            res.setHeader('Authorization' , token)
            res.status(200).json({message: result})
        })
   })
})


//Create user  Create token Send token
authRouter.post('/register' , async (req ,res)=>{
    let user = req.body
    let password = req.body.password
    let username = req.body.username
    let salt = Number(process.env.SALT)
    let hashedPassword = await bcrypt.hash(password , salt)
        user.password = hashedPassword

       await User.create(user, (err, newUser)=>{
        if(err){
            res.status(404).json({message: err.message})
        }
        let token = jwt.sign(username , process.env.JWT_SECRET)
            res.setHeader('Authorization' , token)
        res.status(200).json({user:newUser})
    })
})

module.exports = authRouter