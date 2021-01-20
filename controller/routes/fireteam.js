const middlewareObj = require('../authMiddleware');
const fireteamMiddleware = require('../fireteamMiddleware');
const Router = require('express');
const FireTeam = require('../../models/fireteam');
const Filter = require('bad-words');
const validator = require('validator');
const User = require('../../models/user');
const ACTIVITIES = require('../activities');

const router = Router();

// Helper functions
function validate(user, isNewMember) {
    if (isNewMember) {
        if (!user.username || user.guardianType === "" || !user.light_level || user.platform === "" || !user.consoleID) return false;
        else return true;
    }  
    else {
        if (!user.username || user.guardianType === "" || !user.light_level || !user.consoleID) return false;
        else return true;
    }
}

function validateGuardianType(guardianType) {
    return ["Warlock", "Hunter", "Titan"].some(type => type === guardianType);
}

function validatePlatformType(platformType) {
    return ["PS4", "Xbox", "Steam", "PS5", "Stadia"].some(type => type === platformType);
}

// Helper constants
const MAX_POWER = 1400;
const MIN_POWER = 1050;

/**
 * CREATE ROUTE
 * @POST
 * @Private
 * Add verifyUser again, was removed for testing!
 */
router.post('/create', middlewareObj.verifyUser, async (request, response) => {
    const {leader, activity_type, description, capacity, platform, power_requirement} = request.body;

    // Ensure the platform and gurdarian type of the leader are valid
    if(!validateGuardianType(leader.guardianType)) {
        return response.status(400).json({ msg: "Invalid Guardian Type" });
    }

    if(!validatePlatformType(platform)) {
        return response.status(400).json({ msg: "Invalid Platform" });
    }

    // Ensure the leader's power and the power requirement are valid
    if(!validator.isNumeric(String(leader.light_level), {no_symbols: true}) || Number(leader.light_level) > MAX_POWER || Number(leader.light_level) < MIN_POWER) {
        return response.status(400).json({ msg: "Invalid Leader Light Level" });
    }

    if(!validator.isNumeric(String(power_requirement), {no_symbols: true}) || Number(power_requirement) > MAX_POWER || Number(power_requirement) < MIN_POWER) {
        return response.status(400).json({ msg: "Invalid Power Requirement" });
    }

    // Ensure the activity type is a valid activity
    if(!ACTIVITIES.some(activity => activity === activity_type)) {
        return response.status(400).json({ msg: "Invalid Activity Type" });
    }

    const profanity_filter = new Filter();
    if (!validate(leader, false) || activity_type == "" || description == "" || capacity == "" || platform == "") return response.status(400).json({msg: "Please enter all fields"});

    var validated_description = profanity_filter.clean(validator.escape(description).replace(/&#x2F;/g, "/"));

    // Pull the user from the database and error
    const user = await User.findById(request.user_info.id);
    if(!user || user === undefined) {
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
router.post('/join', middlewareObj.verifyUser, fireteamMiddleware.verifyFireteamIdQP, async (request, response) => {
    const fireteam_id = request.query.id;
    const new_member = request.body;

    // Ensure the platform and gurdarian type of the new member are valid
    if(!validateGuardianType(new_member.guardianType)) {
        return response.status(400).json({ msg: "Invalid Guardian Type" });
    }
    
    if(!validatePlatformType(new_member.platform)) {
        return response.status(400).json({ msg: "Invalid Platform" });
    }

    // Ensure the member's power is valid
    if(!validator.isNumeric(String(new_member.light_level), {no_symbols: true}) || Number(new_member.light_level) > MAX_POWER || Number(new_member.light_level) < MIN_POWER) {
        return response.status(400).json({ msg: "Invalid Leader Light Level" });
    }

    if (!fireteam_id) return response.status(404).json({msg: "Fireteam not found!"});
    if (!validate(new_member, true)) return response.status(400).json({msg: "Please enter all fields"});

    const fireteam_to_join = await FireTeam.findById(fireteam_id);
    const targetFireteam_capacity = fireteam_to_join.capacity;

    if (fireteam_to_join.power_requirement !== "None") {
        if(Number(fireteam_to_join.power_requirement) > Number(new_member.light_level)) return response.status(400).json({msg: "Your power does not meet this fireteam's power requirement"});
    }

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