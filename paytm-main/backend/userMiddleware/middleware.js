const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const authMiddleware = (async (req, res, next) => {
    const token = await req.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(403).json({
            message: "invalid token"
        })
    }
    const splitedToken = token.split(' ');

    const data = jwt.verify(splitedToken[1], JWT_SECRET);
    if (data.userId) {
        req.userId = data.userId
        next()
    } else {
        return res.status(403).json({
            message: "error"
        })
    }



})

module.exports = { authMiddleware }