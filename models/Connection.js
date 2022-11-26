const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["PENDING", "ACCEPTED", "DECLINED"],
            required: true,
        },
        connectionSource: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Connection",
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Connection", connectionSchema);
