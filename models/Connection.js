const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema(
    {
        userId: mongoose.Types.ObjectId,
        contactUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        status: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Connection", connectionSchema);
