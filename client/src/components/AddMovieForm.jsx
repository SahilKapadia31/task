import React, { useState } from 'react';
import { addMovie } from '../api';

const AddMovieForm = ({ onMovieAdded, existingMovies }) => {
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [error, setError] = useState('');

    // Check if the movie already exists
    const isMovieExists = (movieName) => {
        return existingMovies.some((movie) => movie.name.toLowerCase() === movieName.toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check for duplicate movie name
        if (isMovieExists(name)) {
            setError('This movie is already added!');
            return; // Stop further execution
        } else {
            setError(''); // Clear error if no duplicate

            const movie = { name, genre };
            const response = await addMovie(movie); // Assuming your API supports adding movies
            onMovieAdded(response.data); // Pass the added movie to the parent component
            setName('');
            setGenre('');
        }
    };

    return (
        <form className="mb-4" onSubmit={handleSubmit}>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Movie Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <select
                    className="form-select"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    required
                >
                    <option value="">Select Genre</option>
                    <option value="Action">Action</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Drama">Drama</option>
                </select>
            </div>
            {error && <div className="alert alert-danger">{error}</div>} {/* Show error if duplicate */}
            <button type="submit" className="btn btn-primary">
                Add Movie
            </button>
        </form>
    );
};

export default AddMovieForm;