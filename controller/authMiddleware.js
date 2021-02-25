const jwt = require('jsonwebtoken');
const Filter = require('bad-words');
const validator = require('validator');

const middlewareObj = {};

middlewareObj.verifyUser = (request, response, next) => {
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


middlewareObj.verifyRegisterBody = (request, response, next) => {
    const authInfo = {
        username: request.body.username,
        password: request.body.password,
        confirm_password: request.body.confirm_password,
        consoleID: request.body.consoleID,
        email: request.body.email
    }

    const porfanity_filter = new Filter();

    for(let key of Object.keys(authInfo)) {
        // Ensure keys are defined and value are not empty
        if(!authInfo[key] || authInfo[key] === undefined || authInfo[key].length == 0) {
            return response.status(400).json({ msg: "Please enter all fields" });
        }
        
        // Trim for any whitespace on both ends
        authInfo[key] = validator.trim(authInfo[key]);
        
        // If trimming resulted in empty strings, field is invalid
        if(authInfo[key].length == 0) {
            return response.status(400).json({ msg: `Please entier a valid ${key.charAt(0).toUpperCase() + key.slice(1)}` });
        }

        // If any of the fields have profanity, they are invalid
        if(porfanity_filter.isProfane(authInfo[key])) {
            return response.status(400).json({ msg: `${key.charAt(0).toUpperCase() + key.slice(1)} contains profanity` });
        }
    }

    // Ensure username does not contain whitespace
    if(/\s/g.test(authInfo.username)) {
        return response.status(400).json({ msg: "Usernames must not contain any whitespaces!" });
    }

    // Length checks for the Username
    if(authInfo.username.length < 8) {
        return response.status(400).json({ msg: "Usernames must be at least 8 charactes" });
    }

    if(authInfo.username.length > 25) {
        return response.status(400).json({ msg: "Usernames must be at most 25 charactes" });
    }

    // Password length and equality checks
    if(authInfo.password.length < 8 || authInfo.confirm_password.length < 8) {
        return response.status(400).json({ msg: "Passwords must be at least 8 charactes" });
    }

    if(authInfo.password !== authInfo.confirm_password) {
        return response.status(400).json({ msg: "Passwords do not match" });
    }

    // Ensure email is valid
    if(!validator.isEmail(authInfo.email)) {
        return response.status(400).json({ msg: "Invalid Email" });
    }

    // Escape the username of any HTML or DOM
    authInfo.username = validator.escape(authInfo.username);

    request.body = authInfo;
    return next();
}


middlewareObj.verifyLoginBody = (request, response, next) => {
    const authInfo = {
        username: request.body.username,
        password: request.body.password,
    }

    const porfanity_filter = new Filter();

    for(let key of Object.keys(authInfo)) {
        // Ensure keys are defined and value are not empty
        if(!authInfo[key] || authInfo[key] === undefined || authInfo[key].length == 0) {
            return response.status(400).json({ msg: "Please enter all fields" });
        }
        
        // Trim for any whitespace on both ends
        authInfo[key] = validator.trim(authInfo[key]);
        
        // If trimming resulted in empty strings, field is invalid
        if(authInfo[key].length == 0) {
            return response.status(400).json({ msg: `Please entier a valid ${key.charAt(0).toUpperCase() + key.slice(1)}` });
        }

        // If any of the fields have profanity, they are invalid
        if(key != "password" && porfanity_filter.isProfane(authInfo[key])) {
            return response.status(400).json({ msg: `${key.charAt(0).toUpperCase() + key.slice(1)} contains profanity` });
        }
    }

    // Ensure username does not contain whitespace
    if(/\s/g.test(authInfo.username)) {
        return response.status(400).json({ msg: "Usernames must not contain any whitespaces!" });
    }

    if(authInfo.username.length > 25) {
        return response.status(400).json({ msg: "Usernames must be at most 25 charactes" });
    }

    // Password length checks
    if(authInfo.password.length < 8) {
        return response.status(400).json({ msg: "Passwords must be at least 8 charactes" });
    }

    // Escape the username of any HTML or DOM
    authInfo.username = validator.escape(authInfo.username);

    request.body = authInfo;
    return next();
}


module.exports = middlewareObj;