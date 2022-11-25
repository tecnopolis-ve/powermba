const Connection = require("../models/Connection");
const User = require("../models/User");

async function list(userId) {
    try {
        const result = await Connection.find({ userId });
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
                message: e.message,
            },
        };
    }
}

async function create(userId, connection) {
    try {
        const user = await User.findOne(
            {
                accountNumber: connection.accountNumber,
            },
            { password: 0 }
        );
        if (!user) {
            throw new Error(`Unable to connect, user not found.`);
        }
        const item = new Connection({
            userId,
            user,
            status: "PENDING",
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
                message: e.message,
            },
        };
    }
}

async function update(id, connection) {
    try {
        const result = await Connection.findByIdAndUpdate(
            id,
            {
                status: connection.status,
            },
            {
                new: true,
            }
        );
        return {
            status: 200,
            body: {
                message: `Connection updated!`,
                data: result,
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

async function remove(id) {
    try {
        const result = await Connection.deleteOne({ id });
        return {
            status: 200,
            body: {
                message: `Connection deleted!`,
                data: result,
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
    update,
    remove,
};
