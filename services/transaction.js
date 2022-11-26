const Transaction = require("../models/Transaction");
const Connection = require("../models/Connection");
const { checkBalance, updateBalance } = require("./balance");

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
        const hasBalance = await checkBalance(userId, transaction.amount);
        if (!hasBalance) {
            throw new Error(`Insuficient balance.`);
        }
        const destinationUser = await Connection.find({
            userId,
            status: "ACCEPTED",
        }).populate({
            path: "user",
            match: { accountNumber: transaction.destinationAccount },
        });
        const destinationAccount = destinationUser.filter(
            (x) => x.user !== null
        )[0];
        if (!destinationAccount) {
            throw new Error(`Unable to process, user not found.`);
        }
        const newTransaction = new Transaction({
            userId,
            destinationAccount: destinationAccount,
            amount: transaction.amount,
            concept: transaction.concept,
        });
        const result = await newTransaction.save();
        await updateBalance(userId, -transaction.amount);
        await updateBalance(destinationAccount.user._id, transaction.amount);
        return {
            status: 200,
            body: {
                message: `Transaction created!`,
                data: result,
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
