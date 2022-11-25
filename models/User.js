const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    password: String,
    dob: Date,
    accountNumber: String,
});

module.exports = mongoose.model("User", userSchema);
