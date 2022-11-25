const transaction = require("../services/transaction");

async function get(req, res, next) {
    try {
        const get = await transaction.get(req.params.id);
        res.status(get.status).json(get.body);
    } catch (e) {
        console.error(`Error`, e.message);
        next(e);
    }
}

async function create(req, res, next) {
    try {
        const create = await transaction.create(req.session.user.id, req.body);
        res.status(create.status).json(create.body);
    } catch (e) {
        console.error(`Error`, e.message);
        next(e);
    }
}

module.exports = {
    get,
    create,
};