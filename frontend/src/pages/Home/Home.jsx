import React, { useState, useEffect } from 'react';
import MovieItem from './MovieItem';
import { MoviePopup } from '../../components/MoviePopup/MoviePopup';
import popcorn from './popcorn.svg';
import './Home.css';

function Home() {
  const [movieName, setMovieName] = useState('');
  const [movies, setMovies] = useState([]);
  const [fetchComplete, setFetchComplete] = useState(false);
  const [popupIsOpen, setPopupIsOpen] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const movieQuery = params.get('movie');
    if (movieQuery) {
      setMovieName(movieQuery);
      getMovies(movieQuery);
    }
  }, []);

  useEffect(() => {
    if (fetchComplete && movies.length > 0) {
      scrollDown();
    }
  }, [fetchComplete, movies]);

  useEffect(() => {
    const handlePopstate = () => {
      const params = new URLSearchParams(window.location.search);
      const movieQuery = params.get('movie');
      if (movieQuery !== movieName) {
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
  
  function togglePopup() {
    setPopupIsOpen( !popupIsOpen )
  }
  
  const fetchMovies = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
      setFetchComplete(true);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const getMovies = async (query) => {
    setFetchComplete(false);
    const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&include_video=false&language=en-US&query=${query}&page=1&sort_by=popularity.desc&api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb`;
    await fetchMovies(url);
  };

  const getTopMovies = async () => {
    setFetchComplete(false);
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb';
    await fetchMovies(url);
  };

  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  const handleSearch = async () => {
    window.history.pushState({}, '', `?movie=${encodeURIComponent(movieName)}`);
    await getMovies(movieName);
  };

  const [bgColor, setBgColor] = useState('white'); // Initial background color

  // Function to handle mouse enter event
  const handleMouseEnter = () => {
    setBgColor('lightblue'); // Change background color on mouse enter
  };

  // Function to handle mouse leave event
  const handleMouseLeave = () => {
    setBgColor('white'); // Change background color on mouse leave
  };

  const handleTopSearch = async () => {
    window.history.pushState({}, '', '/');
    await getTopMovies();
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
          onChange={e => setMovieName(e.target.value)} />
        <button className='App-search' onClick={handleSearch}>Search</button>
        <img src={popcorn} className="App-logo" alt="logo" />
        <button className="App-scroll" onClick={handleTopSearch}>
          See Top Movies
        </button>
        <button onClick={() => togglePopup()}>Bouton Popup Provisoire</button>
      </header>
      <div className="movies-list">
        {movies.map(movie => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </div>

      <div className="popUpBox">
        {
          popupIsOpen ?
          <MoviePopup movie={movies[0]}>Test</MoviePopup>
          : null
        }
      </div>
    </div>
  );
}

export default Home;
