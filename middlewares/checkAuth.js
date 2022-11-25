const jwt = require("jsonwebtoken");
const config = require("../config/config");

const checkAuth = function (req, res, next) {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (token) {
        jwt.verify(token, config.jwtKey, (err, decoded) => {
            if (err) {
                res.status(403).json({
                    message: "Forbidden!",
                });
            } else {
                req.session = decoded;
                next();
            }
        });
    } else {
        res.status(400).json({
            message: "Token is missing!",
        });
    }
};

module.exports = {
    checkAuth,
};
