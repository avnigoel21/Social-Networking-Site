const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title : {
        type : String,
        require:"title is req",
        minlength : 4,
        maxlength : 150
    },
    body : {
        type: String,
        required : "body is req",
        minlength : 4,
        maxlength : 150
    }
});

module.exports = mongoose.model("Post" , postSchema);