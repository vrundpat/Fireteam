const validator = require('validator');
const Filter = require('bad-words');

// All user middleware will reside in this object
const userMiddleware = {};

// Helper constants
const profanity_filter = new Filter();

// Verifies the set email request body
userMiddleware.verifySetEmailBody = async (req, res, next) => {
    var { email } = req.body;

    email = validator.escape(email);

    if(profanity_filter.isProfane(email)) {
        return res.status(400).json({ msg: "Email must not contain any profanity"});
    }

    if(!validator.isEmail(email)) {
        return res.status(400).json({ msg: "Invalid Email" });
    }

    req.body.email = email;
    return next();
}


module.exports = userMiddleware;
