require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Create express app
const app = express();

// Database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Successfully connected to MongoDB Atlas'))
.catch((error) => console.error('Error connecting to MongoDB Atlas:', error));

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
	res.send("Hello, World!");
});

const QuotesRoute = require('./routes/Quotes');

app.use('/quotes', QuotesRoute);

// Starting server
app.listen(3000, console.log("Listening on port 3000"));