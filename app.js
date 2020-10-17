const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const multer = require("multer");
const app = express();


const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const saveFile = ["image/png", "image/jpg", "image/jpeg"].includes(
    file.mimetype
  )
    ? true
    : false;
  cb(null, saveFile);
};

// app.use(bodyParser.urlencoded()) // x-www-form-urlencoded <form>
app.use(bodyParser.json()) //application/json data
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use('/images', express.static(path.join(__dirname, 'images')));

const MONGODB_URI ="mongodb+srv://codelogicx101:codelogicx101@cluster0.raryu.mongodb.net/messages";

// the frontend can be found on codepen
//https://codepen.io/taruncx101/pen/YzWqzvy
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");

app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);

app.use((err, req, res, next) => {
    console.log(err)
    const status = err.statusCode || 500;
    const message = err.message;
    const errors = err.errors || []
    res.status(status).json({message, errors})
})

mongoose
  .connect(MONGODB_URI + "?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("connected");
    app.listen(8001);
  })
  .catch((err) => console.log(err));

