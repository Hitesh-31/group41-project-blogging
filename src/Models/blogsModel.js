const {default: mongoose} = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true,
        trim: true
    }, 
    body: {
        type : String,
        required: true,
        trim:true
    }, 
    authorId: {
        type: ObjectId,
        required: true,
        ref: "Author",
        trim:true
    },
    tags: {
        type: [String],
        trim:true
    }, 
    category: {
        type: String,
        required: true,
        trim:true 
    }, 
    subcategory: {
        type: [String],
        trim:true
    },
    deletedAt: {
        type: String
       
    }, 
    isDeleted: {
        type: Boolean, 
        default: false
    },
    publishedAt: {
        type: String
        
    }, 
    isPublished: {
        type: Boolean, 
        default: false}
        
}, {timestamps:true})

module.exports = mongoose.model('Blog', blogSchema)
