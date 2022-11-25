const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        userId: mongoose.Types.ObjectId,
        destinationUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        amount: String,
        concept: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
