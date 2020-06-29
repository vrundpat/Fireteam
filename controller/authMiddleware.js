const jwt = require('jsonwebtoken');

const verifyUser = (request, response, next) => {
    try {
        const token = request.headers['auth-token'];
        if (!token) return response.status(401).json({msg: "Authorization denied, no token."});

        const decoded_user_info = jwt.verify(token, process.env.JWT_secret);
        request.user_info = decoded_user_info;
        next();

    } catch (error) {
        return response.status(401).json({msg: "Authroization Denied, invalid token"});
    }
}

module.exports = verifyUser;