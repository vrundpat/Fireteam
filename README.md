# Fireteam

A responsive LFG Website for Destiny 2 made using the MERN Stack + Redux (for application wide state management) and deployed onto a DigitalOcean droplet.
<br>
#### Check it out: https://www.destinylfg.us

###
[![Weekly Users](https://img.shields.io/badge/Weekly%20Users-400+-information)]()
[![Release](https://img.shields.io/badge/Version-1.2.0-blue)]()
[![Analytics](https://img.shields.io/badge/Analytics-GA-pink)]()
[![Generic badge](https://img.shields.io/badge/Website-Up-<COLOR>.svg)](https://shields.io/)
[![Product Maintained](https://img.shields.io/badge/Product%20Maintained-Yes-orange)]()
[![Repo Maintained](https://img.shields.io/badge/Repository%20Maintained-No-red)]() [![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)


##
### Technologies Used: 
[![Generic badge](https://img.shields.io/badge/Database-MongoDB-<COLOR>.svg)](https://shields.io/) [![Generic badge](https://img.shields.io/badge/Backend-Express-<COLOR>.svg)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/Frontend-React-<COLOR>.svg)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/StatePersistence-Redux-<COLOR>.svg)](https://shields.io/)


## Instructions to run locally:
#### Please Note: This product is subject to protection clauses; refer to the License in this repository for further details.

 1) In the project root:
 ```javascript
    npm install
 ```
    
 2) Client folder ```cd client``` : 
     1) Install Dependencies:
     ```javascript
     npm install
     ```
 
 3) Config Environment Variables:
      1) Create a file named ```.env ```  in the project root (this file maybe be hidden by default by your IDE)
      2) In the ```.env``` file, add the following:
         ```javascript
         DB_URI=YOUR-MONGODB-DB-URI
         JWT_Secret=Your preferred json webtoken secret used for issuing/verifying tokens
         FIRETEAM_TIMEOUT=Time between fireteam creations imposed on the users in milliseconds
         FIRETEAM_DESCRIPTION_LIMIT=Maximum length of the fireteam description field
         BUILD=dev
         ```
  4) From the project root:
     ```javascript
     npm run dev
     ```
  5) Open port 8080 in a browser to see have a local version of the site!
     
Note: This is not a production build, optimization of the building process is not implemented for this repo!
