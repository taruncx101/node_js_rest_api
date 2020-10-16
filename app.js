const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();

// app.use(bodyParser.urlencoded()) // x-www-form-urlencoded <form>
app.use(bodyParser.json()) //application/json data

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

app.use("/feed", feedRoutes);

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

