const express =  require('express')
const {verifyJWT} = require('../middleware/jwt')
const Blog = require('../Schemas/BlogSchema')
const blogRouter = express.Router()
const jwt = ('jsonwebtoken')

blogRouter.get('/' , verifyJWT, (req , res)=>{

    Blog.find({private: false} ,(err, blogs)=>{
        if(err){
         return   res.status(400).json({message: err.message})
        }
        res.status(200).json({message:blogs})
    })
})


blogRouter.get('/:username' , verifyJWT, (req , res)=>{
    let username = req.params.username

    Blog.find({username:username} ,(err, blogs)=>{
        if(err){
         return   res.status(400).json({message: err.message})
        }
        res.status(200).json({message:blogs})
    })
})

blogRouter.post('/:username' ,verifyJWT, (req, res)=>{
    let username = req.params.username
    let blogPost = req.body
    blogPost.create_by = username
    blogPost.created_at = Date.now()

    Blog.create(blogPost, (err, blog)=>{
        if(err){
            res.status(400).json({message: err.message})
        }
        res.status(200).json({message:blog})
    })
})

blogRouter.get('/:id' ,verifyJWT, (req , res)=>{
    let id = req.params.id
    Blog.findById(id, (err, blog)=>{
        if(err){
            res.status(400).json({message: err.message})
        }
        res.status(200).json({message:blog})
    })
   
})

blogRouter.put('/:id' , verifyJWT, (req ,res)=>{
    let id = req.params.id
    let newBlog = req.body
    Blog.findByIdAndUpdate(id , newBlog, (err, blog)=>{
        if(err){
            res.status(404).json({message: err.message})
        }
        res.status(200).json({message:blog})
    })
})

blogRouter.delete('/:id', verifyJWT, (req , res)=>{
    let id = req.params.id
    Blog.findById(id, (err)=>{
        if(err){
            res.status(404).json({message: err.message})
        }
        res.status(204).json({message: "DELETED"})
    })
})

module.exports= blogRouter