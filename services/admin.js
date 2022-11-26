const Transaction = require("../models/Transaction");

async function dashboard() {
    try {
        const result = await Transaction.aggregate([
            {
                $group: {
                    _id: "FEES",
                    total: {
                        $sum: "$fees",
                    },
                },
            },
        ]);
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

module.exports = {
    dashboard,
};
