const mongoose = require('mongoose');

const fireteamMiddleware = {};

fireteamMiddleware.verifyFireteamIdQP = (request, response, next) => {
    if(!request.query.id || request.query.id === undefined || request.query.id.length == 0) {
        return response.status(400).json({ msg: "Fireteam not found" });
    }

    if(!mongoose.isValidObjectId(request.query.id)) {
        return response.status(400).json({ msg: "Invalid Fireteam Id" });
    }

    return next();
}

module.exports = fireteamMiddleware;