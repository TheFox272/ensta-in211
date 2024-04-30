import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PlaylistRow.css';
import MovieItem from '../../pages/Home/MovieItem';
import AddMovie from '../AddMovie/AddMovie';
import { MoviePopup } from '../MoviePopup/MoviePopup';


const PlaylistRow = ({playlistname}) => {
    const [moviesId, setMoviesId] = useState([]);
    const [moviesInfo, setMoviesInfo] = useState([]);
    const [moviesLoadingError, setMoviesLoadingError] = useState(null);
    const [showAddMovie, setShowAddMovie] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);


    useEffect(() => {
        const fetchMoviesId = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKDEND_URL}/playlistmovie/getAll`);
                const movieIds = response.data.playlistmovies
                    .filter((movie) => movie.playlistname === playlistname)
                    .map((movie) => movie.movieId);
                setMoviesId(movieIds);
            } catch (error) {
                setMoviesLoadingError('An error occurred while fetching movies.');
                console.error(moviesLoadingError);
            }
        };
        fetchMoviesId();
    }, [playlistname]);
    
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
            <div className="playlistRowtitle">{playlistname}</div>
            <div className="playlistRowmovies">
                {moviesInfo.map((movie) => {
                    return (
                    <MovieItem
                        key={movie.id}
                        movie={movie}
                    />);
                })}
                <div className="playlistRowaddMovie">
                <Link to={`/add-movie/${playlistname}`}className="playlistRowaddButton">+</Link>
                </div>
            </div>
        </div>
    );
}

export default PlaylistRow;