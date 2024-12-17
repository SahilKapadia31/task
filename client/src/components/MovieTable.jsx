import React from 'react';

const MovieTable = ({ movies }) => {
    return (
        <table className="table table-striped table-hover">
            <thead className="table-dark">
                <tr>
                    <th>Movie Name</th>
                    <th>Genre</th>
                    <th>Movie ID</th>
                </tr>
            </thead>
            <tbody>
                {movies.map((movie) => (
                    <tr key={movie.movieId}>
                        <td>{movie.name}</td>
                        <td>{movie.genre}</td>
                        <td>{movie.movieId}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default MovieTable;