'use strict';
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const authRoutes = require('./controller/routes/auth');
const fireteamRoutes = require('./controller/routes/fireteam');
const path = require('path');


// MongoDB Connection SetUp
const database = process.env.DB_URI;
mongoose.connect(database, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
  .then(() => console.log("Successfully connected to Database..."))
  .catch((error) => console.log(`${error}`));

const app = express();
const port = 8080;

// Middleware
app.use(bodyparser.json());

// Routes 
app.use('/users', authRoutes);
app.use('/fireteam', fireteamRoutes);
app.listen(port, () => console.log(`Server listening on port ${port}...`));


// For Maintenance
// app.get('/', async (req, res) => {
// 	res.sendFile(path.resolve(__dirname, 'client', 'public', 'maintenance.html'));
// })
// app.use(express.static('client/public'));


// For production
app.use(express.static('client/build'));

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.get('/login', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.get('/register', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});


// Custom 404
app.use(express.static('client/public'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'public', '404.html'));
})