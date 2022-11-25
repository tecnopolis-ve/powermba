const User = require("../models/User");

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

module.exports = {
    list,
    get,
};
