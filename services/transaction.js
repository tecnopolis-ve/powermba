const Transaction = require("../models/Transaction");

async function list() {
    try {
        return {
            status: 200,
            body: {
                message: `User created!`,
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

async function create(transaction) {
    try {
        const user = transaction.user;
        const item = new Transaction({
            userId: user.id,
            destinationUser: transaction.destinationUser,
            amount: transaction.amount,
            concept: transaction.concept,
        });
        const result = await item.save();
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
