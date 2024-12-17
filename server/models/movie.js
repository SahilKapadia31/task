const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    genre: { type: String, required: true },
    movieId: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Movie', movieSchema);
