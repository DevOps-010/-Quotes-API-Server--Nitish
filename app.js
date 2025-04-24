require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Create express app
const app = express();

// Database
mongoose.connect('mongodb://mongodb:27017/quotesDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Successfully connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.send("Hello, World!");
});

const QuotesRoute = require('./routes/Quotes');

app.use('/quotes', QuotesRoute);

// Starting server
const PORT =3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));