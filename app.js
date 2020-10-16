const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// app.use(bodyParser.urlencoded()) // x-www-form-urlencoded <form>
app.use(bodyParser.json()) //application/json data

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

app.listen(8001)