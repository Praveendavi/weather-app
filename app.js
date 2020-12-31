const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv').config()

// Mongodb Connection
mongoose.connect(process.env.MONGODB_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    
    mongoose.connection.on('connected', () =>{
        console.log('Mongodb is successfully connected')
    })
    
    mongoose.connection.on('error', () =>{
        console.log('error to connect db')
    })

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

// Models
require('./models/Data')

// Import Route
const weatherRoute = require('./routes/weather');

// Use View Engine
app.set('view engine', 'ejs');

// Middleware route
app.use('/', weatherRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server starting at port ${PORT}`));