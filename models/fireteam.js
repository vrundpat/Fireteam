const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const FireTeamSchema = new Schema({
    leader: {
        username: {
            type: String,
            required: true,
        },

        guardianType: {
            type: String,
            required: true
        },

        light_level: {
            type: Number,
            required: true
        },

        consoleID: {
            type: String, 
            required: true
        }
    }, 

    activity_type: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    platform: {
        type: String, 
        required: true
    },

    current_members: [
        {
            username: {
                type: String, 
                required: true
            },

            light_level: {
                type: Number,
                required: true
            },

            guardianType: {
                type: String,
                required: true
            },

            consoleID: {
                type: String,
                required: true
            },

            "_id": false
        }
    ],

    capacity: {
        type: Number,
        required: true
    },

    power_requirement: {
        type: String,
        default: "None"
    },

    time_created: {
        type: Date,
        default: Date.now
    }
})

const FireTeam = model('fireteam', FireTeamSchema);
module.exports = FireTeam;
