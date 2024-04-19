import React, { useState } from 'react';
import './MovieItem.css'; // Import CSS for MovieItem
import noPosterImage from './noPoster.png'; // Import the no poster image
import { Link } from 'react-router-dom';

function MovieItem(movie) {
    const [isExpanded, setIsExpanded] = useState(false); // State to track expansion state

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded); // Toggle expansion state
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : noPosterImage; // Conditionally render poster or no poster image
    console.log(movie)

    return (
        <div className="movie-item">
            <div className="poster-container" onClick={toggleExpansion}>
                <img src={imageUrl} alt={movie.title} />
                {!isExpanded && (
                    <div className="basic-info">
                        <h3>{movie.title}</h3>
                        <p><strong>Release date:<br /></strong> {formatDate(movie.release_date)}</p>
                        <p><strong>Rating:</strong> {movie.vote_average}</p>
                    </div>
                )}
                {isExpanded && (
                    <div className="expanded-info">
                        <h3>{movie.title}</h3>
                        <p className="overview">{movie.overview}</p>
                        <Link to={`?movie=${movie.id}`} className="see-more-link" onClick={() => alert("EEEUHHH")}>See more</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MovieItem;
