require("dotenv").config();

module.exports = {
    port: process.env.PORT,
    mongohost: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@cluster0.g0iikak.mongodb.net/?retryWrites=true&w=majority`,
    jwtKey: process.env.JWT_TOKEN_KEY,
    tokenExpires: 60 * (process.env.MAX_SESSION_TIMEOUT || 15),
};
