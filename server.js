const express = require("express");
const open = require('./routes/open');
const config = require("./config/config.js");

const app = express();
const port = config.port;

// init server
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// entry points
app.use("/", open);

app.listen(port, () => {
    console.log(`Escuchando en http://localhost:${port}`);
});