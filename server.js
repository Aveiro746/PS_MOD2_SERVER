const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const dotenv = require ('dotenv')
const morgan = require('morgan')

dotenv.config()

const mongoConnect = require('./config')
const authRouter = require('./routes/authRouter')
const blogRouter = require('./routes/blogRouter')

const app = express()
const port = process.env.PORT || 1111

app.use(helmet())
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use('/auth' , authRouter)
app.use ('/blog' , blogRouter)


app.get('/' ,(req , res)=>{
    res.status(200).json({message: "API UP"})
})
app.listen(port , ()=>{
    mongoConnect()
    console.log(`Server is listening at ${port}`)
})