const connection = require("../services/connection");

async function list(req, res, next) {
    try {
        const list = await connection.list(req.session.user.id);
        res.status(list.status).json(list.body);
    } catch (e) {
        console.error(`Error`, e.message);
        next(e);
    }
}

async function get(req, res, next) {
    try {
        const get = await connection.get(req.params.id);
        res.status(get.status).json(get.body);
    } catch (e) {
        console.error(`Error`, e.message);
        next(e);
    }
}

async function create(req, res, next) {
    try {
        const create = await connection.create(req.session.user.id, req.body);
        res.status(create.status).json(create.body);
    } catch (e) {
        console.error(`Error`, e.message);
        next(e);
    }
}

async function update(req, res, next) {
    try {
        const update = await connection.update(req.params.id, req.body);
        res.status(update.status).json(update.body);
    } catch (e) {
        console.error(`Error`, e.message);
        next(e);
    }
}

async function remove(req, res, next) {
    try {
        const remove = await connection.remove(req.params.id);
        res.status(remove.status).json(remove.body);
    } catch (e) {
        console.error(`Error`, e.message);
        next(e);
    }
}


module.exports = {
    list,
    get,
    create,
    update,
    remove,
};