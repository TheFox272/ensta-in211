import { useEffect, useState } from 'react';
import axios from 'axios';
import './PlaylistsTable.css';

const useFetchPlaylists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [playlistsLoadingError, setPlaylistsLoadingError] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKDEND_URL}/playlist`)
      .then((response) => {
        setPlaylists(response.data.playlists);
      })
      .catch((error) => {
        setPlaylistsLoadingError('An error occured while fetching playlists.');
        console.error(error);
      });
  }, []);

  return { playlists, playlistsLoadingError };
};

const useFetchMovies = () => {
  const [movies, setMovies] = useState([]);
  const [moviesLoadingError, setMoviesLoadingError] = useState(null);
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=522d421671cf75c2cba341597d86403a`)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          const movieData = response.data.results.map((movie) => ({ title: movie.original_title, id: movie.id, date: movie.release_date, image: movie.poster_path }));
          setMovies(movieData);
          console.log(movies)
        }
      })
      .catch((error) => {
        setMoviesLoadingError('An error occured while fetching users.');
        console.error(error);
      });
  }, []);
  return { movies, moviesLoadingError };
};

function AddMovieForm({ playlist, onAddMovies }) {
  const [movie, setMovie] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddMovies(playlist, movie);
    setMovie('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={movie}
        onChange={(e) => setMovie(e.target.value)}
        placeholder="Ajouter un film"
      />
      <button type="submit">Ajouter</button>
    </form>
  );
}

function PlaylistRow({ playlist }) {
  const [addingMovie, setAddingMovie] = useState(false);
  
  const handleAddMovies = (playlist,movie) => {
    setShowSearchBar(true);
    axios.post(`${import.meta.env.VITE_BACKDEND_URL}/playlistmovie/new`, { playlistname: playlist.playlistname, movieId: movie })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setAddingMovie(false);
  };

  const [deletePlaylist, setDeletePlaylist] = useState(false);
  const handleDelete = () => {
    axios.delete(`${import.meta.env.VITE_BACKDEND_URL}/playlist/:${playlist.id}`)
      .then((response) => {
        console.log(response.data);
        setDeletePlaylist(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const [showSearchBar, setShowSearchBar] = useState(false);
  const [movieName, setMovieName] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    onAddMovies(playlist, movieName);
    setMovieName('');
    setShowSearchBar(false);
  };

  const handleCancel = () => {
    setShowSearchBar(false);
  };

  return (
    <div className="playlist-row">
      <span>{playlist.playlistname}</span>
      {!showSearchBar ? (
        <button onClick={handleAddMovies}>Ajouter des films</button>
      ) : (
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            placeholder="Nom du film"
          />
          <button type="submit">Ajouter</button>
          <button onClick={handleCancel}>Annuler</button>
        </form>
      )}
      <button onClick={handleDelete}>Supprimer la playlist</button>
    </div>
  );
}

function PlaylistsTable() {
  const { playlists, playlistsLoadingError } = useFetchPlaylists();

  if (playlistsLoadingError) {
    return <div>{playlistsLoadingError}</div>;
  }

  return (
    <div>
      {playlists.map((playlist) => (
        <PlaylistRow key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
}

export default PlaylistsTable;
