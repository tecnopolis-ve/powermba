const bcrypt = require("bcrypt");

async function signup(payload) {
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
                message: "Error!",
            },
        };
    }
}

module.exports = {
    signup,
};