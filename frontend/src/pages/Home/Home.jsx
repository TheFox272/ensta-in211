import React, { useState, useEffect } from 'react';
import MovieItem from './MovieItem';
import { MoviePopup } from '../../components/MoviePopup/MoviePopup';
import popcorn from './popcorn.svg';
import './Home.css';

function Home() {
  const [movieName, setMovieName] = useState('');
  const [movies, setMovies] = useState([]);
  const [popupIsOpen, setPopupIsOpen] = useState(false)
  const [noSearsh, setNoSearch] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const movieQuery = params.get('movie');
    if (movieQuery) {
      setMovieName(movieQuery);
      getMovies(movieQuery);
    }
  }, []);

  useEffect(() => {
    const handlePopstate = () => {
      const params = new URLSearchParams(window.location.search);
      const movieQuery = params.get('movie');
      if (movieQuery === null) {
        setNoSearch(true);
        setMovieName('');
        return
      }
      else if (movieQuery === "") {
        setMovieName('');
        getTopMovies();
      }
      else if (movieQuery !== movieName) {
        setMovieName(movieQuery);
        if (movieQuery) {
          getMovies(movieQuery);
        }
      }
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [movieName]);

  useEffect(() => {
    if (movies.length > 0) {
      setNoSearch(false);
    } else {
      setNoSearch(true);
    }
  }, [movies]);

  function togglePopup() {
    setPopupIsOpen(!popupIsOpen)
  }

  const fetchMovies = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const getMovies = async (query) => {
    const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&include_video=false&language=en-US&query=${query}&page=1&sort_by=popularity.desc&api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb`;
    await fetchMovies(url);
  };

  const getTopMovies = async () => {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb';
    await fetchMovies(url);
  };

  const handleSearch = async () => {
    window.history.pushState({}, '', `?movie=${encodeURIComponent(movieName)}`);
    if (movieName === '') {
      await getTopMovies();
    }
    else {
      await getMovies(movieName);
    }
  };

  const handleTopSearch = async () => {
    window.history.pushState({}, '', `?movie=`);
    await getTopMovies();
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      await handleSearch();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">eMovies</h1>
        <input
          type="search"
          className='App-search'
          placeholder="Search for movies"
          value={movieName}
          onChange={e => setMovieName(e.target.value)}
          onKeyDown={handleKeyDown} />
        <button className='App-search' onClick={handleSearch}>Search</button>
        {/* Only display the followings if there is no active searsh */}
        {noSearsh && (
          <div className="App-void">
            <img src={popcorn} className="App-logo" alt="logo" />
            <button className="App-scroll" onClick={handleTopSearch}>
              See Top Movies
            </button>
            <button onClick={() => togglePopup()}>Bouton Popup Provisoire</button>
          </div>
        )}
        {!noSearsh && (
          <div className="movies-list">
            {movies.map(movie => (
              <MovieItem key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </header>

      <div className="popUpBox">
        {
          popupIsOpen ?
            <MoviePopup>Test</MoviePopup>
            : null
        }
      </div>
    </div>
  );
}

export default Home;
