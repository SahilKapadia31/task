const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

// Generate a 6-digit random movie ID
const generateMovieId = () => Math.floor(100000 + Math.random() * 900000).toString();

// Add a new movie
router.post('/add', async (req, res) => {
    try {
        const { name, genre } = req.body;
        const newMovie = new Movie({ name, genre, movieId: generateMovieId() });
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Search movies
router.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
        const movies = await Movie.find({ name: { $regex: query, $options: 'i' } });
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router