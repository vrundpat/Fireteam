const User = require('../../models/user');
const Router = require('express');
const middlewareObj = require('../authMiddleware');
const userMiddleware = require('../userMiddleware');

const router = Router();

/**
 * SET EMAIL Route
 * @PUT
 * @Private
 */
router.put('/email', middlewareObj.verifyUser, userMiddleware.verifySetEmailBody, async (request, response) => {
    const { email } = request.body;

    const user_with_same_email = await User.findOne({email: email});
    if(user_with_same_email) {
        return response.status(400).json({msg: "This email is already in use! Please enter a different email."});
    }

    // Update/set the email of the user
    try {
        const user = await User.updateOne({_id: request.user_info.id}, {$set: {"email": email}});
        return response.status(200).json({msg: "Successfully updated your email!"});
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({msg: "An error occured, please try again."});
    }
})

module.exports = router;