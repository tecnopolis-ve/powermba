const bcrypt = require("bcrypt");
const { generateNumber, generateRandPassword } = require("../utils/utils");
const User = require("../models/User");

async function signup(payload) {
    try {
        const accountNumber = generateNumber();
        const password = generateRandPassword(14);

        const salt = await bcrypt.genSalt(10);
        const saltedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name: payload.name,
            lastName: payload.lastName,
            dob: payload.dob,
            password: saltedPassword,
            accountNumber,
        });
        const saved = await user.save();
        return {
            status: 200,
            body: {
                message: `User created!`,
                data: { ...saved.toObject(), password },
            },
        };
    } catch (e) {
        console.log(e);
        return {
            status: 500,
            body: {
                message: "Error!",
            },
        };
    }
}

module.exports = {
    signup,
};
