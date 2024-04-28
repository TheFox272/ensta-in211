import { useEffect, useState } from 'react';
import axios from 'axios';
import './AddMovie.css';
import MovieItemPlaylist from './MovieItemPlaylist';

const AddMovie=({playlistname,state,onCancel})=>{
  const [showSearchBar, setShowSearchBar] = useState(state);  
  const [movieName, setMovieName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  useEffect(() => {
    setShowSearchBar(state);
    setSearchBarVisible(state);
  }, [state]);

    const handleAddMovie = (movieId) => {
      console.log(movieId);
      setSelectedMovie(movieId);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      if (selectedMovie) {
        axios
          .post(`${import.meta.env.VITE_BACKDEND_URL}/playlistmovie/new`, {
            playlistname: playlistname,
            movieId: selectedMovie,
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      setMovieName('');
      setShowSearchBar(false);
      onCancel();
    }
  
    const handleCancel = (event) => {
      setShowSearchBar(false);
      onCancel();
    };
  
    useEffect(() => {
      if (movieName.length > 0) {
        axios
          .get(`https://api.themoviedb.org/3/search/movie?include_adult=false&include_video=false&language=en-US&query=${movieName}&page=1&sort_by=popularity.desc&api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb`)
          .then((response)=>{setSearchResults(response.data.results);});
      } else {
        setSearchResults([]);
      }
    }, [movieName]);

    return (
      <div className="playlist-row">
        <div className="no-blur">
        {showSearchBar && (
          <div className="search-container">
            <form onSubmit={handleSubmit}>
              <input
                className="search-bar"
                type="text"
                value={movieName}
                onChange={(e) => setMovieName(e.target.value)}
                placeholder="Nom du film"
              />
              <button className="solid-button" type="submit">Ajouter</button>
              <button className="solid-button" onClick={handleCancel}>Annuler</button>
            </form>
            <div className="movielist">
              {searchResults.map((movie) => (
                <MovieItemPlaylist
                  key={movie.id}
                  movie={movie}
                  isSelected={movie.id === selectedMovie}
                  onSelect={handleAddMovie}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      </div>
    );
  }

export default AddMovie;