const mongoose = require('mongoose')




const blogSchema = new mongoose.Schema({
    created_by: {type: String , required: true},
    created_at: {type: Date , required: true},
    blog_title: {type: String , required: true},
    blog_content: {type: String},
    private : {type: Boolean , required: true}
})

module.exports