const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const expressValidator = require ('express-validator');
dotenv.config();

//db connectivity
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB is Connected"));

mongoose.connection.on("error" , err => {
    console.log(`DB connection error : ${err.message}`)
});

//bring in routes
const postRoutes =require("./routes/post");
const authRoutes =require("./routes/auth");

//middleware
app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(expressValidator());

app.use("/" , postRoutes);
app.use("/" , authRoutes);

const port = 8080;
app.listen(port , () => {
    console.log(`app is listening to port : ${port}`);
});
