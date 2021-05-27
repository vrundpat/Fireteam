# Fireteam

## This respository no longer reflects additional features provided by the deployed version of this application as of May, 2021.

A responsive LFG Website for Destiny 2 made using the MERN Stack + Redux (for application wide state management) and deployed onto a DigitalOcean droplet.
<br></br>
#### Check it out: https://www.destinylfg.us

#### Currently, there are ~400 users/week on average!


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
