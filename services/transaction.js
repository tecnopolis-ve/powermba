const Transaction = require("../models/Transaction");
const Connection = require("../models/Connection");

async function list(userId) {
    try {
        const result = await Transaction.find({ userId });
        return {
            status: 200,
            body: {
                result,
            },
        };
    } catch (e) {
        console.log(e);
        return {
            status: 500,
            body: {
                message: e.message,
            },
        };
    }
}

async function get(id) {
    try {
        const result = await Transaction.findById(id);
        return {
            status: 200,
            body: {
                result,
            },
        };
    } catch (e) {
        console.log(e);
        return {
            status: 500,
            body: {
                message: e.message,
            },
        };
    }
}

async function create(userId, transaction) {
    try {
        const destinationUser = await Connection.findOne({
            status: "ACCEPTED",
        }).populate({
            path: "user",
            match: { "user.accountNumber": transaction.destinationAccount },
        });
        if (!destinationUser) {
            throw new Error(`Unable to process, user not found.`);
        }
        const newTransaction = new Transaction({
            userId,
            destinationAccount: destinationUser,
            amount: transaction.amount,
            concept: transaction.concept,
        });
        const result = await newTransaction.save();
        return {
            status: 200,
            body: {
                message: `Transaction created!`,
                data: result.toObject(),
            },
        };
    } catch (e) {
        console.log(e);
        return {
            status: 500,
            body: {
                message: e.message,
            },
        };
    }
}

module.exports = {
    list,
    get,
    create,
};
