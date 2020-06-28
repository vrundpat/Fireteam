const verifyUser = require('../authMiddleware');
const Router = require('express');
const FireTeam = require('../../models/fireteam');

const router = Router();

function validate(user, isNewMember) {
    if (isNewMember) {
        if (!user.username || user.guardianType == "" || !user.light_level || user.platform == "" || !user.consoleID) return false;
        else return true;
    }  
    else {
        if (!user.username || user.guardianType == "" || !user.light_level || !user.consoleID) return false;
        else return true;
    }
}


/**
 * CREATE ROUTE
 * @POST
 * @Private
 * Add verifyUser again, was removed for testing!
 */
router.post('/create', verifyUser, async (request, response) => {
    const {leader, activity_type, description, capacity, platform, power_requirement} = request.body;
    if (!validate(leader, false) || activity_type == "" || description == "" || capacity == "" || platform == "") return response.status(400).json({msg: "Please enter all fields"});

    try {
        const sample_fireteam = FireTeam({
            leader,
            activity_type,
            description,
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
router.post('/join', verifyUser, async (request, response) => {
    const fireteam_id = request.query.id;
    const new_member = request.body;
    if (!fireteam_id) return response.status(404).json({msg: "Fireteam not found!"});
    if (!validate(new_member, true)) return response.status(400).json({msg: "Please enter all fields"});

    const fireteam_to_join = await FireTeam.findById(fireteam_id);
    const targetFireteam_capacity = fireteam_to_join.capacity;

    if (fireteam_to_join.power_requirement !== "None") {
        if(Number(fireteam_to_join.power_requirement) > Number(new_member.light_level)) return response.status(400).json({msg: "You power does not meet this fireteams power requirement"});
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
    // await FireTeam.find((error, all_fireteams) => {
    //     if (error) response.status(500).json({msg: "An error occured, please try again."});
    //     else response.status(200).json(all_fireteams);
    // });
    await FireTeam.find().sort({time_created: -1}).exec((error, all_fireteams) => {
        if (error) response.status(500).json({msg: "Something went wrong, please try again"})
        else response.status(200).json(all_fireteams);
    });
})


module.exports = router;