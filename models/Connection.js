const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["PENDING", "ACCEPTED", "DECLINED"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Connection", connectionSchema);
