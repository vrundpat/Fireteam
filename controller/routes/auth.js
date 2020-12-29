const User = require('../../models/user');
const Router = require('express');
const jwt =  require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Filter = require('bad-words');

const router = Router();
const jwtSecret = process.env.JWT_secret;


/**
 * LOGIN Route
 * @POST
 * @Public
 */
router.post('/login', async (request, response) => {
    
    const {username, password} = request.body;
    
    if (!username || !password) return response.status(400).json({msg: "Please enter all fields"});

    const validated_username = validator.escape(username);
    
    // Find use with matching username and check passwords
    try {
        const user = await User.findOne({username: validated_username});
        if (!user) return response.status(400).json({msg: "User does not exist"});

        const correct_password = await bcrypt.compare(password, user.password);
        if (!correct_password) return response.status(400).json({msg: "Invalid credentials"});

        const auth_token = jwt.sign({ id: user._id, username: user.username, consoleID: user.consoleID}, jwtSecret);

        response.status(200).json({
            token: auth_token,
            user: {
                username: username,
                consoleID: user.consoleID
            }
        });
    } catch (error) {
        return response.status(400).json({msg: "Something went wrong, please try again!"});
    }
})


/**
 * REGISTER Route
 * @Post
 * @Public 
 */
router.post('/register', async (request, response) => {
    
    const {username, password, consoleID, confirm_password} = request.body;
    const porfanity_filter = new Filter();

    // Validate and sanitize input
    if (!username || !password || !consoleID || !confirm_password) return response.status(400).json({msg: "Please enter all fields"});
    if (username.replace(/\s/g, '').length === 0) return response.status(400).json({msg: "Please enter a valid username"});
    if (password.replace(/\s/g, '').length === 0) return response.status(400).json({msg: "Please enter a valid password"});
    if (consoleID.replace(/\s/g, '').length === 0) return response.status(400).json({msg: "Please enter a valid consoleID"});
    if (username.length < 3) return response.status(400).json({msg: "Username must be at least 3 characters long"});
    if (username.length > 20) return response.status(400).json({msg: "Username must not be more than 20 characters lomg"});
    if (consoleID.length > 25) return response.status(400).json({msg: "ConsoleID must not be more than 25 characters lomg"});
    if (consoleID.length < 3) return response.status(400).json({msg: "ConsoleID must be at least 3 characters long"});
    if (password.length < 8) return response.status(400).json({msg: "Password must be at least 8 characters long"});
    if (password !== confirm_password) return response.status(400).json({msg: "Passwords do not match"});
    if (porfanity_filter.isProfane(username)) return response.status(400).json({msg: "Username contains profanity, please choose another username"});
    if (porfanity_filter.isProfane(consoleID)) return response.status(400).json({msg: "ConsoleID contains profanity, please choose another consoleID"});
    if (/\s/g.test(username)) return response.status(400).json({msg: "Username must not contain white spaces"});
    const validated_username = validator.escape(username);

    try {

        // Check is user with same username already exists 
        const existing_user = await User.findOne({username: validated_username});
        if (existing_user) return response.status(400).json({msg: "Username already in use"});
        
        // Hash the password
        const hashed_password = await bcrypt.hash(password, await bcrypt.genSalt(10));
        if (!hashed_password) return response.status(400).json({msg: "Something went wrong, please try again"});
        
        // Create the user 
        const new_user = User({
            username: validated_username,
            password: hashed_password,
            consoleID: consoleID
        });
        
        // Save the user to the database
        new_user.save();

        // Generate authenitcation token and send back some user information with the token
        const auth_token = jwt.sign({ id: new_user._id, username: new_user.username, consoleID: new_user.consoleID}, jwtSecret);
        response.status(200).json({
            token: auth_token,
            user: {
                username: username,
                consoleID: consoleID
            }
        });

    } catch (error) {
        return response.status(400).json({msg: "Something went wrong, please try again"});
    }
})

module.exports = router;