const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config.js");
const open = require('./routes/open');
const signup = require("./routes/signup.js");
const panel = require("./routes/panel.js");
const admin = require("./routes/admin.js");
const auth = require("./routes/auth.js");

mongoose.connect(config.mongohost)

const app = express();
const port = config.port;

// init server
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// entry points
app.use("/", open);
app.use("/signup", signup);
app.use("/panel", panel);
app.use("/admin", admin);
app.use("/auth", auth);

app.listen(port, () => {
    console.log(`Escuchando en http://localhost:${port}`);
});