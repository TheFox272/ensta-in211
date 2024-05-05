import React, { useState } from 'react';
import './MovieItemRow.css'; 
import noPosterImage from '../../pages/Home/noPoster.png'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MoviePopup } from '../../components/MoviePopup/MoviePopup';

function MovieItemRow({ movie, playlistname }) {
    const [isExpanded, setIsExpanded] = useState(false); // State to track expansion state
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const navigate = useNavigate();
    
    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    
    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    
    const handleMouseMove = (event) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
    };
    
    const toggleExpansion = () => {
        setIsExpanded(!isExpanded); // Toggle expansion state
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const handleDelete = (playlistname, movieId) => {
        axios.get(`${import.meta.env.VITE_BACKDEND_URL}/playlistmovienew/getByNameAndMovieId/${playlistname}/${movieId}`)
        .then(response => {  
            const playlistMovieId = response.data.playlistmoviesnew[0].id;
            axios.delete(`${import.meta.env.VITE_BACKDEND_URL}/playlistmovienew/${playlistMovieId}`)
            .then(() => {
                console.log("Movie deleted");
                window.location.reload();
            })
            .catch(error => {
                console.error("Error deleting movie:", error);
            });
        })
        .catch(error => {
            console.error("Error getting playlistmovie:", error);
        });
        
    };

    const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : noPosterImage; // Conditionally render poster or no poster image
    console.log(movie)

    return (
        <div className="movie-item">
            <div className="poster-container">
                <img src={imageUrl} alt={movie.title} />
                {!isExpanded && (
                    <div className="basic-info">
                         <button 
                        className="delete-button" 
                        onClick={() => handleDelete(playlistname,movie.id)} 
                        onMouseEnter={handleMouseEnter} 
                        onMouseLeave={handleMouseLeave}
                        onMouseMove={handleMouseMove}
                    >
                        -
                    </button>
                    {isHovered && (
                            <div 
                            style={{ 
                                position: 'fixed', 
                                top: mousePosition.y - 20,  // Ajoutez un décalage à la position y
                                left: mousePosition.x + 20,  // Ajoutez un décalage à la position x
                                color: 'white',
                            }}
                        >
                            Supprimer
                        </div>
                    )}
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

export default MovieItemRow;
