const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config.js");
const open = require('./routes/open');
const signup = require("./routes/signup.js");

mongoose.connect(config.mongohost)

const app = express();
const port = config.port;

// init server
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// entry points
app.use("/", open);
app.use("/signup", signup);

app.listen(port, () => {
    console.log(`Escuchando en http://localhost:${port}`);
});