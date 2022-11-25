const Connection = require("../models/Connection");
const User = require("../models/User");

async function list(payload) {
    try {
        const user = payload.user;
        const result = await Connection.find({ userId: user.id }).exec();
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

async function get(id) {
    try {
        const result = await Connection.findById(id);
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

async function create(connection) {
    try {
        const user = connection.user;
        const contactUser = await User.findOne({
            accountNumber: connection.accountNumber,
        });
        const item = new Connection({
            userId: user.id,
            contactUser,
        });
        const result = await item.save();
        return {
            status: 200,
            body: {
                message: `Connection created!`,
                data: result.toObject(),
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

async function update(id, connection) {
    try {
        const result = await Connection.findByIdAndUpdate(id, {
            status: connection.status,
        });
        return {
            status: 200,
            body: {
                message: `Connection created!`,
                data: result,
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
        const result = await Connection.deleteOne({ id });
        return {
            status: 200,
            body: {
                message: `Connection created!`,
                data: result,
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
    update,
    remove,
    findByAccountId,
};
