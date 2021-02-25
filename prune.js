require('dotenv').config()
const mongoose = require('mongoose');
const FireTeam = require('./models/fireteam');
const User = require('./models/user');

/* This function will be responsible of removing fireteams that are older than 2 months */
async function prune(current_date, offset) {

    // MongoDB Connection SetUp
    const database = process.env.DB_URI;
    await mongoose.connect(database, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then(() => console.log("Successfully connected to Database...\n"))
    .catch((error) => console.log(`${error}`));
    
    // Fetch all fireteams & error check
    const fireteams =  await FireTeam.find().sort({time_created: -1}).exec();
    if(!fireteams || fireteams === undefined || fireteams.length === 0) { 
        return;
    }

    for(let team of fireteams) {
        // Get milliseconds since epoch
        const team_date = new Date(team.time_created).getTime();

        // If difference is larger than offset, it should be removed
        if(current_date - team_date >= offset) {
            await team.remove();
        }
    }

    await mongoose.disconnect();
    console.log("Disconnected from databse...");
    return;
}

async function addNewField(field_name, field_value) {
    // MongoDB Connection SetUp
    const database = process.env.DB_URI;
    await mongoose.connect(database, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then(() => console.log("Successfully connected to Database...\n"))
    .catch((error) => console.log(`${error}`));

    // Add the new field to all user documents
    const users = await User.updateMany({}, {$set: {"email": "N/A"}});

    await mongoose.disconnect();
    console.log("Disconnected from databse...");
}

// Only prune when the site is undermaintenace, as it will prevent data corruptioin
// and mishandled synchronization issues
if(process.env.BUILD === "maintenance") {
    const month_in_milliseconds = 2629800000;
    prune(new Date().getTime(), month_in_milliseconds * 2);
}