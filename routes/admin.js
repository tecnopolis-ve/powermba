const express = require("express");
const { checkAuth } = require("../middlewares/checkAuth");
const admin = require("../controllers/admin");

const router = express.Router();

router.use(checkAuth);

router.get("/accounts", admin.list);
router.get("/account/:id", admin.get);

module.exports = router;