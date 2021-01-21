const mongoose = require('mongoose');
const validator = require('validator');
const Filter = require('bad-words');
const ACTIVITIES = require('./activities');

const fireteamMiddleware = {};

// Helper constants
const MAX_POWER = 1400;
const MIN_POWER = 1050;
const profanity_filter = new Filter();

// Helper functions
function validateGuardianType(guardianType) {
    return ["Warlock", "Hunter", "Titan"].some(type => type === guardianType);
}

function validatePlatformType(platformType) {
    return ["PS4", "Xbox", "Steam", "PS5", "Stadia"].some(type => type === platformType);
}

function validatePowerLevel(light_level) {
    return validator.isNumeric(light_level) && Number(light_level) >= MIN_POWER && Number(light_level) <= MAX_POWER;
}

function validateCapacity(capacity) {
    return validator.isNumeric(String(capacity)) && Number(capacity) > 0 && Number(capacity) <= 6;
}


fireteamMiddleware.validateMember = (request, response, next) => {

    const memberInfo = {};
    
    if(request.body.leader !== undefined) {
        memberInfo.username = request.body.leader.username;
        memberInfo.consoleID = request.body.leader.consoleID;
        memberInfo.guardianType = request.body.leader.guardianType;
        memberInfo.platform = request.body.leader.platform;
        memberInfo.light_level = request.body.leader.light_level;
    }
    else {
        memberInfo.username = request.body.username;
        memberInfo.consoleID = request.body.consoleID;
        memberInfo.guardianType = request.body.guardianType;
        memberInfo.platform = request.body.platform;
        memberInfo.light_level = request.body.light_level;
    }

    for(let key of Object.keys(memberInfo)) {
        // Undefined or empty fields checks
        if(!memberInfo[key] || memberInfo[key].length === 0) {
            return response.status(400).json({ msg: `Missing ${request.body.leader === undefined ? "Member" : "Leader"} Information!` });
        }

        // Trim for any whitespace on both ends
        memberInfo[key] = validator.trim(memberInfo[key]);
        
        // If trimming resulted in empty strings, field is invalid
        if(memberInfo[key].length == 0) {
            return response.status(400).json({ msg: `Please entier a valid ${key.charAt(0).toUpperCase() + key.slice(1)}` });
        }

        // If any of the fields have profanity, they are invalid
        if(profanity_filter.isProfane(memberInfo[key])) {
            return response.status(400).json({ msg: `${key.charAt(0).toUpperCase() + key.slice(1)} contains profanity!` });
        }
    }

    // Username validity checks
    if(/\s/g.test(memberInfo.username) || memberInfo.username.length < 8 || memberInfo.username.length > 25) {
        return response.status(400).json({ msg: `Invalid ${request.body.leader === undefined ? "Member" : "Leader"} Username` });
    }
    
    // Ensure the leader's power level is valid
    if(!validatePowerLevel(memberInfo.light_level)) {
        return response.status(400).json({ msg: `Invalid ${request.body.leader === undefined ? "Member" : "Leader"} Power Level` });
    }

    // Ensure the guardian type of the leader is valid
    if(!validateGuardianType(memberInfo.guardianType)) {
        return response.status(400).json({ msg: `Invalid ${request.body.leader === undefined ? "Member" : "Leader"} Guardian Type` });
    }

    // Ensure the platform of the fireteam is valid
    if(!validatePlatformType(memberInfo.platform)) {
        return response.status(400).json({ msg: `Invalid ${request.body.leader === undefined ? "Member" : "Leader"} Platform Type` });
    }

    // Update request body to reflect valiadted data
    if(request.body.leader === undefined) {
        request.body = memberInfo;
    }
    else {
        request.body.leader = memberInfo;
    }

    return next();
}

fireteamMiddleware.verifyFireteamIdQP = (request, response, next) => {
    if(!request.query.id || request.query.id === undefined || request.query.id.length == 0) {
        return response.status(400).json({ msg: "Fireteam not found" });
    }

    if(!mongoose.isValidObjectId(request.query.id)) {
        return response.status(400).json({ msg: "Invalid Fireteam Id" });
    }

    return next();
}


fireteamMiddleware.verifyCreateFireteamBody = (request, response, next) => {

    const fireteamInfo = {
        activity_type: request.body.activity_type, 
        description: request.body.activity_type, 
        capacity: request.body.capacity, 
        platform: request.body.platform, 
        power_requirement: request.body.power_requirement
    }

    for(let key of Object.keys(fireteamInfo)) {
        if(!fireteamInfo[key] || fireteamInfo[key].length === 0) {
            return response.status(400).json({ msg: "Please enter all fields" });
        }

        // Trim for any whitespace on both ends
        fireteamInfo[key] = validator.trim(fireteamInfo[key]);
        
        // If trimming resulted in empty strings, field is invalid
        if(fireteamInfo[key].length == 0) {
            return response.status(400).json({ msg: `Please entier a valid ${key.charAt(0).toUpperCase() + key.slice(1)}` });
        }

        // If any of the fields have profanity, they are invalid
        if(profanity_filter.isProfane(fireteamInfo[key])) {
            return response.status(400).json({ msg: `${key.charAt(0).toUpperCase() + key.slice(1)} contains profanity!` });
        }
    }

    // Ensure the activity type is valid
    if(!ACTIVITIES.some(activity => activity === fireteamInfo.activity_type)) {
        return response.status(400).json({ msg: "Please choose a valid Activity Type" });
    }

    // Validate fireteam platform
    if(!validatePlatformType(fireteamInfo.platform)) {
        return response.status(400).json({ msg: "Invalid Platform Type" });
    }

    // Validate fireteam capacity
    if(!validateCapacity(fireteamInfo.capacity)) {
        return response.status(400).json({ msg: "Invalid Fireteam Capacity" });
    }

    // Validate fireteam power requirement
    if(!validatePowerLevel(fireteamInfo.power_requirement)) {
        return response.status(400).json({ msg: "Invalid Power Requirement" });
    }

    // Update request body to reflect validated data
    fireteamInfo.leader = request.body.leader;
    request.body = fireteamInfo;

    return next();
}

module.exports = fireteamMiddleware;