const Connection = require("../models/Connection");

async function list() {
    try {
        const data = await Connection.find({ name: 'john', age: { $gte: 18 } }).exec();
        return {
            status: 200,
            body: {
                message: `User created!`,
                data
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
                message: "Error!",
            },
        };
    }
}

async function create() {
    try {
        const connection = new Connection({
            userId,
            contactUser,
        });
        const saved = await connection.save();
        return {
            status: 200,
            body: {
                message: `User created!`,
                data: saved.toObject(),
            },
        };
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

async function remove(id) {
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

async function findByAccountId(accountId) {
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
    list,
    get,
    create,
    remove,
    findByAccountId,
};
