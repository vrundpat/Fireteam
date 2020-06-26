const jwt = require('jsonwebtoken');
const jwtSecret = require('../keys').jwtSecret;

const verifyUser = (request, response, next) => {
    try {
        const token = request.headers['auth-token'];
        if (!token) return response.status(401).json({msg: "Authorization denied, no token."});

        const decoded_user_info = jwt.verify(token, jwtSecret);
        request.user_info = decoded_user_info;
        next();

    } catch (error) {
        return response.status(401).json({msg: "Authroization Denied, invalid token"});
    }
}

module.exports = verifyUser;