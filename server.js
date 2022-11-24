const express = require("express");
const public = require('./routes/public');

const app = express();
const port = 3000;

// init server
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// entry points
app.use("/", public);

app.listen(port, () => {
    console.log(`Escuchando en http://localhost:${port}`);
});