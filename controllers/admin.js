const admin = require("../services/admin");

async function dashboard(req, res, next) {
    try {
        const get = await admin.dashboard();
        res.status(get.status).json(get.body);
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
