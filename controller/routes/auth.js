const User = require('../../models/user');
const Router = require('express');
const jwt =  require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const middlewareObj = require('../authMiddleware');

const router = Router();
const jwtSecret = process.env.JWT_secret;


/**
 * LOGIN Route
 * @POST
 * @Public
 */
router.post('/login', middlewareObj.verifyLoginBody, async (request, response) => {
    
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
                consoleID: user.consoleID,
                hasRegisteredEmail: user.email !== "N/A"
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
router.post('/register', middlewareObj.verifyRegisterBody, async (request, response) => {
    
    const {username, password, consoleID, confirm_password, email} = request.body;

    try {

        // Check is user with same username, email, or console id already exists 
        const existing_user = await User.findOne({username: username});
        if (existing_user) return response.status(400).json({msg: "Username already in use"});

        const existing_email = await User.findOne({email: email});
        if(existing_email) return response.status(400).json({msg: "Email already in use"});

        const existing_console_id = await User.findOne({consoleID: consoleID});
        if(existing_console_id) return response.status(400).json({msg: "Console ID already in use"});
        
        // Hash the password
        const hashed_password = await bcrypt.hash(password, await bcrypt.genSalt(10));
        if (!hashed_password) return response.status(400).json({msg: "Something went wrong, please try again"});
        
        // Create the user 
        const new_user = await User({
            username: username,
            password: hashed_password,
            consoleID: consoleID,
            email: email
        });
        
        // Save the user to the database
        await new_user.save();

        // Generate authenitcation token and send back some user information with the token
        const auth_token = jwt.sign({ id: new_user._id, username: new_user.username, consoleID: new_user.consoleID}, jwtSecret);
        response.status(200).json({
            token: auth_token,
            user: {
                username: username,
                consoleID: consoleID,
                hasRegisteredEmail: true,
            }
        });

    } catch (error) {
        console.log(error);
        return response.status(400).json({msg: "Something went wrong, please try again"});
    }
})

module.exports = router;