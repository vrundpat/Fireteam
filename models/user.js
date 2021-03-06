const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const UserSchema = new Schema ({
    
    username: {
        type: String, 
        required: true, 
        unique: true
    },
    
    password: {
        type: String, 
        required: true
    },

    email: {
        type: String,
        required: true,
    },

    register_date: {
        type: Date,
        default: Date.now
    },

    consoleID: {
        type: String,
        required: true
    },

    last_created: {
        type: Date
    }
})


const User = model('user', UserSchema);
module.exports = User;