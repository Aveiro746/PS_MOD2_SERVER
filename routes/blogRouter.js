const express =  require('express')
const jwt = require('../middleware/jwt')
const Blog = require('../Schemas/BlogSchema')
const blogRouter = express.Router()

blogRouter.get('/:username' , jwt.authenticateToken, (req , res)=>{
    let username = req.params.username

    Blog.find({username:username} ,(err, blogs)=>{
        if(err){
            res.status(400).json({message: err.message})
        }
        res.status(200).json({message:blogs})
    })
})

blogRouter.post('/:username' ,jwt.authenticateToken, (req, res)=>{
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

blogRouter.get('/:id' ,jwt.authenticateToken, (req , res)=>{
    let id = req.params.id
    Blog.findById(id, (err, blog)=>{
        if(err){
            res.status(400).json({message: err.message})
        }
        res.status(200).json({message:blog})
    })
   
})

blogRouter.put('/:id' , jwt.authenticateToken, (req ,res)=>{
    let id = req.params.id
    let newBlog = req.body
    Blog.findByIdAndUpdate(id , newBlog, (err, blog)=>{
        if(err){
            res.status(404).json({message: err.message})
        }
        res.status(200).json({message:blog})
    })
})

blogRouter.delete('/:id', jwt.authenticateToken, (req , res)=>{
    let id = req.params.id
    Blog.findByIdAndDelete(id, (err)=>{
        if(err){
            res.status(404).json({message: err.message})
        }
        res.status(204).json({message: "DELETED"})
    })
})

module.exports= blogRouter