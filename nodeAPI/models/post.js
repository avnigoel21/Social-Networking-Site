const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema

const postSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
        // require:"title is req",
        // minlength : 4,
        // maxlength : 150
    },
    body : {
        type: String,
        required : true
        // required : "body is req",
        // minlength : 4,
        // maxlength : 150
    },
    photo : {
        data: Buffer,
        contentType: String
    },
    postedBy : {
        type: ObjectId,
        ref: "User"

    },
    created : {
        type: Date,
        default: Date.now
    } 
});

module.exports = mongoose.model("Post" , postSchema);