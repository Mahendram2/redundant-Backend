/* Dependencies */
const express = require('express');
const mongoose = require('mongoose');

/*  Initalalize Express */
const app = express();

/* dotenv Config */
require('dotenv').config();
const {PORT = 4000, DATABASE_URL} = process.env;

/* MongoDB Connection */
mongoose.connect(DATABASE_URL);

mongoose.connection
.on('connected', () => console.log('Connected to MongoDB'))
.on('disconnected', () => console.log('Disonnected to MongoDB'))
.on('error', () => console.log('Problem with MongoDB:' + error.message))

/* Mount Middleware */


/* Routes */
app.get('/', (req, res) => {
    res.send('Welcome');
});

/* Listner */
app.listen(PORT, () =>{
    console.log("Express is running on Port:" + PORT);
});