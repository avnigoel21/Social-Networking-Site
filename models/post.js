const mongoose = require("mongoose");

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
    }
});

module.exports = mongoose.model("Post" , postSchema);