const User = require("../models/User");

function calculateFees(amount) {
    let percentage = amount <= 1000 ? 1 : 0.5;
    return parseFloat(((amount * percentage) / 100).toFixed(2));
}

function calculateAmountFees(amount, signed = true) {
    const fees = calculateFees(amount);
    return (signed ? -1 : 1) * (amount + fees);
}

async function checkBalance(userId, amount) {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error(`Unable to process, user not found.`);
        }
        const fees = calculateFees(amount);
        return user.balance >= amount + fees;
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
        user.balance = parseFloat((user.balance + amount).toFixed(2));
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
    calculateFees,
    calculateAmountFees,
};
