import React, { useState } from 'react';
import './MovieItem.css'; 
import noPosterImage from './noPoster.png'; 
import { Link } from 'react-router-dom';
import { MoviePopup } from '../../components/MoviePopup/MoviePopup';

function MovieItem({ movie, openPopup }) {
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

    return (
        <div className="movie-item">
            <div className="poster-container" onClick={openPopup}>
                <img src={imageUrl} alt={movie.title} />
                {!isExpanded && (
                    <div className="basic-info">
                        <h3>{movie.title}</h3>
                        <p><strong>Release date:<br /></strong> {formatDate(movie.release_date)}</p>
                        <p><strong>Rating:</strong> {movie.vote_average}</p>
                    </div>
                )}
                {/*isExpanded && (
                    <div className="expanded-info">
                        <h3>{movie.title}</h3>
                        <p className="overview">{movie.overview}</p>
                        <Link to={`?movie=${movie.id}`} className="see-more-link">See more</Link>
                    </div>
                )*/}
            </div>
        </div>
    );
}

export default MovieItem;
