const JWT_SECRET = require("..");

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authentication;
    const data = token.split(" ");
    const string = data[1];
    const decoded = jwt(string, JWT_SECRET);
    req.username = decoded.username
    if (decoded.username) {
        next()
    } else {
        res.status(403).json({
            msg: "You are not authenticated"
        })
    }
}

module.exports = userMiddleware;