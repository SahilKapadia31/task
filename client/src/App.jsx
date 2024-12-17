import React, { useState, useEffect } from 'react';
import AddMovieForm from './components/AddMovieForm';
import MovieTable from './components/MovieTable';
import SearchBar from './components/SearchBar';
import { getMovies } from './api';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const App = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  // Fetch movies on initial load
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await getMovies();
      setMovies(response.data);
      setFilteredMovies(response.data);
    };
    fetchMovies();
  }, []);

  // Handle added movie
  const handleMovieAdded = (newMovie) => {
    setMovies((prev) => [...prev, newMovie]);
    setFilteredMovies((prev) => [...prev, newMovie]);
  };

  // Handle search results
  const handleSearchResults = (results) => {
    setFilteredMovies(results);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Movie To-Do List</h1>
      <AddMovieForm onMovieAdded={handleMovieAdded} existingMovies={movies} />
      <SearchBar onSearchResults={handleSearchResults} allMovies={movies} />
      <MovieTable movies={filteredMovies} />
    </div>
  );
};

export default App;
