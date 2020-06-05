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

    register_date: {
        type: Date,
        default: Date.now
    },

    consoleID: {
        type: String,
        required: true
    },
})


const User = model('user', UserSchema);
module.exports = User;