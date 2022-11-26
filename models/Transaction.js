const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        userAccount: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        originAccount: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        destinationAccount: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        amount: {
            type: Number,
            required: true,
        },
        fees: {
            type: Number,
            required: true,
        },
        concept: {
            type: String,
        },
        type: {
            type: String,
            enum: ["INBOUND", "OUTBOUND"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
