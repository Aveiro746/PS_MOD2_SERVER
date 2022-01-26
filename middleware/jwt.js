const jwt = require('jsonwebtoken')



function generateAcessToken(username){
    return jwt.sign(username,process.env.JWT_SECRET)
}

function authenticateToken(req , res , next){
    const token = req.headers['Authorization']


    if(token === null){
        res.status(403).json({message: "Token Required"})
    }

    jwt.verify(token, process.env.JWT_SECRET) , (err , user) =>{
        if(err){
            res.status(400).json({message: err.message})
        }
        next()
    }
}
