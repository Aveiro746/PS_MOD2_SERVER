const jwt = require('jsonwebtoken')

function verifyJWT(req , res , next){
    let token = req.get('Authorization')

    if (token === null || token === undefined){
        res.status(403).json({message: "YOU MUST BE LOGGED IN"})
    }
    jwt.verify(token , process.env.JWT_SECRET, (error , result)=>{
        if(error){
            res.status(400).json({message: "Not authorized"})
        }   
        if(result === false){
            res.status(403).json({message: "YOU MUST BE LOGGED IN"})
        }
        next()
    })

}
//generates token
function generateAcessToken(username){
    return jwt.sign(username,process.env.JWT_SECRET)
}
// Make Route private
function authenticateToken(req , res , next){
    const token = req.get('Authorization')


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

module.exports ={ generateAcessToken , authenticateToken , verifyJWT}