const express = require('express');
const router = express.Router();
const Quote = require('../models/Quotes');

// Get all routes
router.get('/', async (req, res) => {
    try {
        const quotes = await Quote.find();
        res.status(200).json(quotes);
    } catch (error) {
        console.error('Error fetching quotes:', error);
        res.status(500).json({ message: 'Failed to fetch quotes', error: error.message });
    }
});

// Create new quote
router.post('/new', async (req, res) => {
    try {
        const newQuote = new Quote(req.body);
        const savedQuote = await newQuote.save();
        
        if (!savedQuote) {
            return res.status(400).json({ message: 'Failed to save quote' });
        }
        
        res.status(201).json(savedQuote);
    } catch (error) {
        console.error('Error creating quote:', error);
        res.status(500).json({ message: 'Failed to create quote', error: error.message });
    }
});

// Get specific quote
router.get('/get/:id', async (req, res) => {
    try {
        const q = await Quote.findById({ _id: req.params.id });
        if (!q) {
            return res.status(404).json({ message: 'Quote not found' });
        }
        res.status(200).json(q);
    } catch (error) {
        console.error('Error fetching quote:', error);
        res.status(500).json({ message: 'Failed to fetch quote', error: error.message });
    }
});

// Delete a quote
router.delete('/delete/:id', async (req, res) => {
    try {
        const result = await Quote.findByIdAndDelete({ _id: req.params.id });
        if (!result) {
            return res.status(404).json({ message: 'Quote not found' });
        }
        res.status(200).json(result);
    } catch (error) {
        console.error('Error deleting quote:', error);
        res.status(500).json({ message: 'Failed to delete quote', error: error.message });
    }
});

// Update a quote
router.patch('/update/:id', async (req, res) => {
    try {
        const q = await Quote.updateOne({_id: req.params.id}, {$set: req.body});
        if (q.matchedCount === 0) {
            return res.status(404).json({ message: 'Quote not found' });
        }
        res.status(200).json(q);
    } catch (error) {
        console.error('Error updating quote:', error);
        res.status(500).json({ message: 'Failed to update quote', error: error.message });
    }
});

// Get random quote
router.get('/random', async (req, res) => {
    try {
        const count = await Quote.countDocuments();
        const random = Math.floor(Math.random() * count);
        const q = await Quote.findOne().skip(random);
        
        if (!q) {
            return res.status(404).json({ message: 'No quotes found' });
        }
        
        res.status(200).json(q);
    } catch (error) {
        console.error('Error fetching random quote:', error);
        res.status(500).json({ message: 'Failed to fetch random quote', error: error.message });
    }
});

module.exports = router;