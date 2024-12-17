import React, { useState, useEffect } from 'react';
import { searchMovies } from '../api';

const SearchBar = ({ onSearchResults, allMovies }) => {
    const [query, setQuery] = useState('');
    const [recentSearches, setRecentSearches] = useState([]);
    const [isFocused, setIsFocused] = useState(false);

    // Trigger search API on typing
    useEffect(() => {
        const fetchSearchResults = async () => {
            if (query.trim()) {
                const response = await searchMovies(query);
                onSearchResults(response.data);
            } else {
                onSearchResults(allMovies);
            }
        };

        const debounce = setTimeout(() => {
            fetchSearchResults();
        }, 300); // Debounce to limit API calls

        return () => clearTimeout(debounce); // Cleanup debounce
    }, [query, onSearchResults]);

    const handleRecentSearchClick = (search) => {
        setQuery(search);
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        if (e.target.value.trim() && !recentSearches.includes(e.target.value)) {
            setRecentSearches((prev) => [e.target.value, ...prev].slice(0, 5)); // Limit to 5
        }
    };

    return (
        <div className="mb-4 position-relative">
            <input
                type="text"
                className="form-control"
                placeholder="Search by movie name..."
                value={query}
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            {isFocused && recentSearches.length > 0 && (
                <ul className="list-group position-absolute w-100" style={{ zIndex: 10 }}>
                    {recentSearches.map((search, index) => (
                        <li
                            key={index}
                            className="list-group-item list-group-item-action"
                            onMouseDown={() => handleRecentSearchClick(search)} // Use onMouseDown to prevent blur
                        >
                            {search}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
