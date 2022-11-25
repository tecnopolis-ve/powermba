const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config.js");
const User = require("../models/User");

async function login(payload) {
    try {
        const user = await User.findOne({
            accountNumber: payload.accountNumber,
        });

        const validPassword = await bcrypt.compare(
            payload.password,
            user.password
        );

        if (validPassword) {
            const authUser = user;
            delete authUser.password;

            const payload = {
                user: authUser,
            };
            const token = jwt.sign(payload, config.jwtKey, {
                expiresIn: config.tokenExpires,
            });

            return {
                status: 200,
                body: {
                    message: "Login success!",
                    token,
                },
            };
        } else {
            return {
                status: 401,
                body: {
                    message: "Login error!",
                },
            };
        }
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
    login,
};
