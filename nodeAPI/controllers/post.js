const Post = require("../models/post");
const formidable = require("formidable");
const fs = require ("fs");
const _ = require("lodash"); // used for update function having "extend"

exports.postById = (req , res , next , id) => {
    Post.findById(id)
        .populate("postedBy" , "_id name")
        .exec((err , post) => {
            if(err || !post) {
                return res.status(400).json ({
                    error: err
                });
            }
        req.post = post;
        next();
    });
};

exports.getPosts = (req , res) => {
    //res.send("hello ");
    // res.json({
    //         posts: [{title:"First Post"} , {title: "Second Post"}]
    // });
    const posts = Post.find()
    .populate("postedBy" , "_id name")
    .select("_id title body")      // for custom output
    .then(posts => {
        res.json({posts : posts}); //by default status is always 200 if it runs
    })
    .catch(err => console.log(err));
};

exports.createPost = (req , res) => {
    let form = new formidable.IncomingForm()
    form.keepExtentions = true
    form.parse(req , (err , fields , files) => {
        if(err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        let post = new Post(fields);
        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        post.postedBy = req.profile;
        if(files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }
        post.save((err , result) => {
            if(err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });

    const post = new Post(req.body);
    //console.log("CREATING POST :" , req.body);

    // post.save((err , result) => {
    //     if(err){
    //         return res.status(400).json({
    //             error: err
    //         });
    //     }
    //     res.status(200).json({
    //         post: result
    //     });
    // });
    post.save().then(result => {
        res.status(200).json({
            post : result
        });
    });

};

exports.postsByUser = (req , res) => {
    Post.find({postedBy : req.profile._id})
        .populate("postedBy" , "_id name")
        .sort("created")
        .exec((err , posts) => {
            if(err){
                return res.status(400).json({
                    error: err
                });
            }
            res.json(posts);
        });
};

exports.isPoster = (req , res , next) => {
    let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id;
    if(!isPoster) {
        return res.status(403).json ({
            error: "User is not authorized"
        });
    }
    next();
};

exports.updatePost = (req , res , next) => {
    let post = req.post
    post = _.extend(post , req.body)
    post.updated = Date.now();
    post.save(err => {
        if(err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(post);
    });
};

exports.deletePost = (req , res) => {
    let post = req.post;
    post.remove((err , post) => {
        if(err) {
            return res.status(400).json ({
                error : err
            });
        }
        res.json({
            message: "Post deleted successfully"
        });
    });
};

