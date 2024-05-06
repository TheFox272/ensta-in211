import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PlaylistRow.css';
import MovieItemRow from './MovieItemRow';
import AddMovie from '../AddMovie/AddMovie';
import { MoviePopup } from '../MoviePopup/MoviePopup';
import useTokenVerification from '../VerifyToken/VerifyToken';


const PlaylistRow = ({ playlistname, userId }) => {
    const [moviesId, setMoviesId] = useState([]);
    const [moviesInfo, setMoviesInfo] = useState([]);
    const [moviesLoadingError, setMoviesLoadingError] = useState(null);
    const [showAddMovie, setShowAddMovie] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState(playlistname); // New state for the new playlist name
    const [isEditing, setIsEditing] = useState(false); // New state for editing mode
    const { loggedIn, email, uid } = useTokenVerification();

    const handleNameChange = (event) => {
        setNewPlaylistName(event.target.value);
    };

    const handleNameSubmit = (event) => {
        if (event.key === 'Enter') {
            axios.put(`${import.meta.env.VITE_BACKDEND_URL}/playlist/updateName/${playlistname}`, { newPlaylistName })
                .then(() => {
                    setIsEditing(false);
                    window.location.reload();
                })
                .catch(error => {
                    console.error("Error updating playlist name:", error);
                });
        }
    };

    const handleDeletePlaylist = (playlistname) => {
        axios.get(`${import.meta.env.VITE_BACKDEND_URL}/playlistmovienew/getByName/${playlistname}/${uid}`)
            .then(response => {
                const playlistMovies = response.data.playlistmoviesnew;
                const deleteMoviesPromises = playlistMovies.map(movie => {
                    return axios.delete(`${import.meta.env.VITE_BACKDEND_URL}/playlistmovienew/${movie.id}/${uid}`);
                });

                Promise.all(deleteMoviesPromises)
                    .then(() => {
                        axios.delete(`${import.meta.env.VITE_BACKDEND_URL}/playlist/deleteByName/${playlistname}/${uid}`)
                            .then(() => {
                                window.location.reload();
                            })
                            .catch(error => {
                                console.error("Error deleting playlist:", error);
                            });
                    })
                    .catch(error => {
                        console.error("Error deleting movies:", error);
                    });
            })
            .catch(error => {
                console.error("Error getting playlistmovie:", error);
            });
    };


    useEffect(() => {
        const fetchMoviesId = async (playlistname, uid) => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKDEND_URL}/playlistmovienew/getByName/${playlistname}/${uid}`);
                const movieIds = response.data.playlistmoviesnew
                    .map((movie) => movie.movieId);
                setMoviesId(movieIds);
            } catch (error) {
                setMoviesLoadingError('An error occurred while fetching movies.');
                console.error(moviesLoadingError);
            }
        };
        if (uid) {
            fetchMoviesId(playlistname, uid);
        }
    }, [playlistname, uid]); // Add uid to the dependency array

    useEffect(() => {
        const fetchMovieInfo = async (movieId) => {
            try {
                const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=522d421671cf75c2cba341597d86403a`;
                const response = await axios.get(url);
                return response.data;
            } catch (error) {
                return null;
            }
        };

        const fetchAllMovieInfo = async () => {
            const allMovieInfo = await Promise.all(moviesId.map(fetchMovieInfo));
            setMoviesInfo(allMovieInfo);
        };

        if (moviesId.length > 0) {
            fetchAllMovieInfo();
        }
    }, [playlistname, moviesId]);

    return (
        <div className="playlistRow">
            <div className='playlistRowheader'>
                {isEditing ? (
                    <input
                        className="playlistRowtitle"
                        value={newPlaylistName}
                        onChange={handleNameChange}
                        onKeyPress={handleNameSubmit}
                    />
                ) : (
                    <div
                        className="playlistRowtitle"
                        onClick={() => setIsEditing(true)}
                        style={{ cursor: 'pointer' }}
                    >
                        {playlistname}
                    </div>
                )}
                <div className="playlistRowdeletePlaylist">
                    <button className='playlistdelete-button' onClick={() => handleDeletePlaylist(playlistname)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg></button>
                </div>
            </div>
            <div className="playlistRowmovies">
                {moviesInfo.map((movie) => {
                    return (
                        <MovieItemRow key={movie.id} movie={movie} playlistname={playlistname} />
                    );
                })}
                <div className="buttonsContainer">
                    <div className="playlistRowaddMovie">
                        <Link to={`/add-movie/${playlistname}`} className="playlistRowaddButton">+</Link>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default PlaylistRow;