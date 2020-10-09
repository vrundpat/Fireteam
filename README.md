# FireTeam-LFG

A responsive LFG Website for Destiny 2 made using the MERN Stack + Redux (for application wide state management) and deployed onto a VPS.      
Check it out: https://www.destinylfg.us


Instructions to run locally:

 1) In the project root:
 ```
    npm install
 ```
    
 2) Client folder ```cd client``` : 
     1) Install Dependencies:
     ```
     npm install
     ```
 
 3) Config Environment Variables:
      1) Create a file named ```.env ```  in the project root (this file maybe be hidden by default by your IDE)
      2) In the ```.env``` file, add the following:
         ```
         DB_URI=YOUR-MONGODB-DB-URI
         JWT_Secret=Your preferred json webtoken secret used for issuing/verifying tokens
         ```
  4) From the project root:
     ```
     npm run dev
     ```
     
Note: This is not a production build, optimization of the building process is not implemented for this repo!
