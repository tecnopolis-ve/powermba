const express = require("express");
const open = require('./routes/open');

const app = express();
const port = 3000;

// init server
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// entry points
app.use("/", open);

app.listen(port, () => {
    console.log(`Escuchando en http://localhost:${port}`);
});