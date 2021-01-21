const middlewareObj = require('../authMiddleware');
const fireteamMiddleware = require('../fireteamMiddleware');
const Router = require('express');
const FireTeam = require('../../models/fireteam');
const validator = require('validator');
const User = require('../../models/user');

const router = Router();


/**
 * CREATE ROUTE
 * @POST
 * @Private
 * Add verifyUser again, was removed for testing!
 */
router.post('/create', middlewareObj.verifyUser, fireteamMiddleware.verifyCreateFireteamBody, fireteamMiddleware.validateMember, async (request, response) => {

    const {leader, activity_type, description, capacity, platform, power_requirement} = request.body;

    var validated_description = validator.escape(description).replace(/&#x2F;/g, "/");

    // Pull the user from the database and error
    const user = await User.findById(request.user_info.id);
    if(!user || user === undefined || user.username !== leader.username || user.consoleID !== leader.consoleID) {
        return response.status(400).json({ msg: "User not found!" });
    }

    // Ensure this user has not created a fireteam in the past 30 minutes
    const current_date = new Date();
    const last_user_created_date = new Date(user.last_created);

    if(current_date - last_user_created_date < Number(process.env.FIRETEAM_TIMEOUT)) {
        return response.status(400).json({ msg: "You may only create a fireteam once every 30 minutes!" });
    }
    
    try {
        const sample_fireteam = FireTeam({
            leader,
            activity_type,
            description: validated_description,
            capacity,
            platform,
            power_requirement,
        });
        
        const new_fireteam = await sample_fireteam.save();
        await FireTeam.update(
            {_id: new_fireteam._id, 'current_members.username': {$ne: leader.username}},
            {$addToSet: 
                {current_members: 
                    {
                        username: leader.username, 
                        light_level: leader.light_level, 
                        guardianType: leader.guardianType, 
                        consoleID: leader.consoleID
                    }
                }
            },
        );

        // Save the date this fireteam was created under the user and save
        user.last_created = Date.now();
        await user.save();

        const fireteam = await FireTeam.findById(new_fireteam._id)

        return response.status(200).json({fireteam});
        
    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Something went wrong, please try again!"});
    }
})


/**
 * JOIN ROUTE
 * @Post
 * @private
 * Route used to join a fireteam
 * Add verifyUser again, was removed for testing!
 */
router.post('/join', middlewareObj.verifyUser, fireteamMiddleware.verifyFireteamIdQP, fireteamMiddleware.validateMember, async (request, response) => {
    const fireteam_id = request.query.id;
    const new_member = request.body;

    const fireteam_to_join = await FireTeam.findById(fireteam_id);
    const targetFireteam_capacity = fireteam_to_join.capacity;

    // Ensure the member's power is larger than or equal to the power requirement of the fireteam
    if (fireteam_to_join.power_requirement !== "None") {
        if(Number(fireteam_to_join.power_requirement) > Number(new_member.light_level)) return response.status(400).json({msg: "Your power does not meet this fireteam's power requirement"});
    }

    // Ensure this member exists in the database
    const user = await User.findOne({username: new_member.username, consoleID: new_member.consoleID});
    if(!user || user === undefined) {
        return response.status(400).json({ msg: "User does not exist!" });
    }

    // Ensure platforms match & that this member is not already in the fireteam
    if (fireteam_to_join.current_members.some(member => member.username == new_member.username))  return response.status(400).json({msg: "This user is aleady in the fireteam!"});
    if (fireteam_to_join.platform != new_member.platform) return response.status(400).json({msg: "Mismatched platforms, please join a fireteam on the correct platform!"});
    if (fireteam_to_join.current_members.length >= targetFireteam_capacity) return response.status(400).json({msg: "Fireteam full! Please join another fireteam!"});

    try {
        await FireTeam.update(
            {_id: fireteam_id, 'current_members.username': {$ne: new_member.username}},
            {$addToSet:
                {current_members: {   
                    username: new_member.username, 
                    light_level: new_member.light_level, 
                    guardianType: new_member.guardianType, 
                    consoleID: new_member.consoleID
                }}
            },
        );
        
        const fireteam = await FireTeam.findById(fireteam_id)
        return response.status(200).json({fireteam});

    } catch (error) {
        console.log(error);
        return response.status(400).json({msg: "An error occured when joining the fireteam, please try agian."});
    }
})


/**
 * GET 1 FIRETEAM ROUTE
 * @GET
 * @Public
 * Get the information for a fireteam based on the id
 */
router.get('/getfireteam', async (request, response) => {
    const id = request.query.id;
    if (!id) return response.status(400).json({msg: "Missing FireTeam ID!"});

    try {
        const fireteam = await FireTeam.findById(id);
        return response.status(200).json({fireteam});

    } catch (error) {
        return response.status(404).json({msg: "Fireteam doesn't exist"});
    }
})


/**
 * GET ALL FIRETEAMS ROUTE
 * @GET 
 * @Public 
 * Get the information for all of the fireteams 
 */
router.get('/getall', async (request, response) => {
    await FireTeam.find().sort({time_created: -1}).exec((error, all_fireteams) => {
        if (error) return response.status(500).json({msg: "Something went wrong, please try again"});
        else return response.status(200).json({all_fireteams: all_fireteams, current_time: new Date(Date.now())});
    });
})


module.exports = router;