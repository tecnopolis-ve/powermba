const User = require("../models/User");

async function checkBalance(userId, amount) {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error(`Unable to process, user not found.`);
        }
        return user.balance >= amount;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function updateBalance(userId, amount) {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error(`Unable to process, user not found.`);
        }
        user.balance = user.balance + amount;
        const result = await user.save();
        return result;
    } catch (e) {
        console.log(e);
        return false;
    }
}

module.exports = {
    checkBalance,
    updateBalance,
};
