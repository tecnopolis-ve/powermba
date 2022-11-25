const auth = require("../services/auth");

async function login(req, res, next) {
    try {
        const login = await auth.login(req.body);
        res.status(login.status).json(login.body);
    } catch (e) {
        console.error(`Error`, e.message);
        next(e);
    }
}

module.exports = {
    login,
};
