const User = require('../../models/user');
const Router = require('express');
const jwt =  require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = Router();
const jwtSecret = require('../../keys').jwtSecret;


/**
 * LOGIN Route
 * @POST
 * @Public
 */
router.post('/login', async (request, response) => {
    
    const {username, password} = request.body;
    
    // Sanitize and Validation
    //   TODO: Add sanitization
    if (!username || !password) return response.status(400).json({msg: "Please enter all fields"});

    // Find use with matching username and check passwords
    try {
        const user = await User.findOne({username});
        if (!user) return response.status(400).json({msg: "User does not exist"});

        const correct_password = await bcrypt.compare(password, user.password);
        if (!correct_password) return response.status(400).json({msg: "Invalid credentials"});

        const auth_token = jwt.sign({ id: user._id, username: user.username, consoleID: user.consoleID}, jwtSecret);

        response.status(200).json({
            token: auth_token,
            user: {
                username: user.username,
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
    
    const {username, password, consoleID} = request.body;

    // Validate and sanitize input
    if (!username || !password || !consoleID) return response.status(400).json({msg: "Please enter all fields"});

    try {
        
        // Check is user with same username already exists 
        const existing_user = await User.findOne({username});
        if (existing_user) return response.status(400).json({msg: "Username already in use"});
        
        // Hash the password
        const hashed_password = await bcrypt.hash(password, await bcrypt.genSalt(10));
        if (!hashed_password) return response.status(400).json({msg: "Something went wrong during hashing. Try again."});
        
        // Create the user 
        const new_user = User({
            username: username,
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
                username: new_user.username,
                consoleID: new_user.consoleID
            }
        });

    } catch (error) {
        return response.status(400).json({msg: "Something went wrong, please try again!"});
    }
})

module.exports = router;