'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const authRoutes = require('./controller/routes/auth');
const fireteamRoutes = require('./controller/routes/fireteam');

// MongoDB Connection SetUp
const database = require('./keys').mongoURI;
mongoose.connect(database, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
  .then(() => console.log("Successfully connected to Database..."))
  .catch((error) => console.log(`${error}`));

const app = express();
const port = 8080;
// HAHAHAHAH
// Middleware
app.use(bodyparser.json());


// Routes 
app.use('/users', authRoutes);
app.use('/fireteam', fireteamRoutes);
app.get('/', (request, response) => response.send("Root Route!"));
app.listen(port, () => console.log(`Server listening on port ${port}...`));




// STAPLE TYPE
 /**
  * Guardian 
  *     - Character type: String
  *     - Light: Int
  */


// TABLES

/**
 * Users
 *      - userID: Int (Auto Increment)
 *      - username: String
 *      - password: String (<- will get hashed)
 *      - Characters: Guardians
 *      - Primary console: String
 *      - Console/Steam-Id
 */

/**
 * FireTeam 
 *      - FireteamId: Int
 *      - Leader: username, guardian type, consoleID, light
 *      - Members: JSON Array of {username, guardian type, consoleID, light}
 *      - Time Created: Date
 *      - Current # of members: Int
 *      - Activity Type: String (Raid/Mission/Managerie etc.)
 *      - Description of activity: String
 *      - Platform (PS4, Xbox, Steam)
 */
