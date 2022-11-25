const admin = require("../services/admin");

async function list(req, res, next) {
    try {
        const result = [];
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
                message: "Error!",
            },
        };
    }
}

async function get(req, res, next) {
    try {
        const result = null;
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
                message: "Error!",
            },
        };
    }
}

module.exports = {
    list,
    get,
};
