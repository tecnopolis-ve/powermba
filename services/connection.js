const mongoose = require("mongoose");
const Connection = require("../models/Connection");
const User = require("../models/User");

async function list(userId) {
    try {
        const result = await Connection.find({ userId }).populate("user", {
            password: 0,
        }).sort('-createdAt');
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
        const result = await Connection.findById(id).populate("user", {
            password: 0,
        });
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
        const targetUser = await User.findOne(
            {
                accountNumber: connection.accountNumber,
            },
            { password: 0 }
        );
        if (!targetUser) {
            throw new Error(`Unable to connect, user not found.`);
        }
        const currentConnection = await Connection.findOne({
            userId,
            user: targetUser,
            status: { $in: ["PENDING", "ACCEPTED"] },
        });
        if (currentConnection) {
            throw new Error(`Unable to connect, a connection already exists.`);
        }
        const session = await mongoose.startSession();
        await session.withTransaction(async () => {
            const connectionSource = await Connection.create(
                [
                    {
                        userId,
                        user: targetUser,
                        status: "PENDING",
                    },
                ],
                { session }
            );
            await Connection.create(
                [
                    {
                        userId: targetUser,
                        user: userId,
                        status: "PENDING",
                        connectionSource: connectionSource[0],
                    },
                ],
                { session }
            );
        });
        session.endSession();
        return {
            status: 200,
            body: {
                message: `Connection request created!`,
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
        const connectionRequest = await Connection.findOne({
            _id: id,
            connectionSource: { $exists: true },
        });
        if (!connectionRequest) {
            throw new Error(`Unable to connect, connection not found.`);
        }
        const session = await mongoose.startSession();
        await session.withTransaction(async () => {
            await Connection.updateOne(
                {
                    _id: connectionRequest.id,
                },
                {
                    status: connection.status,
                },
                { session }
            );
            await Connection.updateOne(
                {
                    _id: connectionRequest.connectionSource,
                },
                {
                    status: connection.status,
                },
                { session }
            );
        });
        session.endSession();
        return {
            status: 200,
            body: {
                message: `Connection request ${connection.status}!`,
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
        const connectionRequest = await Connection.findById(id);
        if (!connectionRequest) {
            throw new Error(`Unable to connect, connection not found.`);
        }
        const session = await mongoose.startSession();
        await session.withTransaction(async () => {
            await Connection.deleteOne(
                {
                    _id: connectionRequest._id,
                },
                { session }
            );
            let deletionFilter;
            if (connectionRequest.connectionSource) {
                deletionFilter = {
                    _id: connectionRequest.connectionSource,
                };
            } else {
                deletionFilter = {
                    connectionSource: connectionRequest._id,
                };
            }
            await Connection.deleteOne(deletionFilter, { session });
        });
        session.endSession();
        return {
            status: 200,
            body: {
                message: `Connection deleted!`,
                data: connectionRequest,
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
