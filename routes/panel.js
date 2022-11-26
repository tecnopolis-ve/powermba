const express = require("express");
const { checkAuth } = require("../middlewares/checkAuth");
const connection = require('../controllers/connection');
const transaction = require('../controllers/transaction');

const router = express.Router();

router.use(checkAuth);

router.get("/connections", connection.list);
router.get("/connection/:id", connection.get);
router.post("/connection", connection.create);
router.put("/connection/:id", connection.update);
router.delete("/connection/:id", connection.remove);
router.post("/transaction", transaction.create);
router.get("/transactions", transaction.list);

module.exports = router;