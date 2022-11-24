const signup = require("../services/signup");

async function create(req, res, next) {
    try {
        const signin = await signup.signup(req.body);
        res.status(signin.status).json(signin.body);
    } catch (e) {
        console.error(`Error`, e.message);
        next(e);
    }
}

module.exports = {
    create,
};