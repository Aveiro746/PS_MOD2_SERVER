const bcrypt = require('bcrypt')
const express = require ('express')
const User = require('../Schemas/UserSchema')
const jwt = require('../middleware/jwt')
const authRouter = express.Router()

authRouter.get('/' , jwt.authenticateToken, (req , res)=>{
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

    User.findOne({username: username} , (err , retUser)=>{
       if(err){
           res.status(404).json({message: err.message})
       }
   })

        bcrypt.compare(password, retUser.password, (err , result)=>{
            if(err){
                res.status(400).json({message: err.message})
            }

            if(result === false){
                res.status(403).json({message: "You must be logged in"})
            }
            let token = jwt.generateAccessToken(retUser.username)
            res.setHeader('Authorization' , token)
            res.status(200).json({message: retUser})
   })
})


//Create user  Create token Send token
authRouter.post('/register' , async (req ,res)=>{
    let user = req.body
    let password = req.body.password
    let salt = Number(process.env.SALT)
    let hashedPassword = await bcrypt.hash(password , salt)
        user.password = hashedPassword

    User.create(user, (err, newUser)=>{
        if(err){
            res.status(404).json({message: err.message})
        }
        res.status(200).json({user:newUser})
    })
})

module.exports = authRouter