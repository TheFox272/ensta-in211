import { useEffect, useState } from 'react';
import axios from 'axios';
import './PlaylistsTable.css';
import PlaylistRow from '../PlaylistRow/PlaylistRow';

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

const useFetchMovies = (playlistname) => {
  const [movies, setMovies] = useState([]);
  const [moviesLoadingError, setMoviesLoadingError] = useState(null);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKDEND_URL}/playlistmovie/${playlistname}`)
      .then((response) => {
        setMovies(response.data.movies);
      })
      .catch((error) => {
        setMoviesLoadingError('An error occurred while fetching movies.');
        console.error(error);
      });
  }, [playlistname]);
  return { movies, moviesLoadingError };
};

const Addmovie=()=>{
  const [playlists, setPlaylists] = useState([]);
  const [movies, setMovies] = useState([]);

  const handleAddMovie = (playlist, movie) => {
    axios
      .post(`${import.meta.env.VITE_BACKDEND_URL}/playlistmovie/new`, {
        playlistname: playlist,
        movieId: movie,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePlus = (event) => {
    event.preventDefault();
    setShowSearchBar(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddMovie(playlistname, movieName);
    setMovieName('');
    setShowSearchBar(false);
  }

  const handleCancel = (event) => {
    setShowSearchBar(false);
  };

  return (
    <div className="playlist-row">
      <span>{playlist.playlistname}</span>
      {!showSearchBar ? (
        <button onClick={handlePlus}>Ajouter des films</button>
      ) : (
        <form onSubmit={handleSubmit}>
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

 const PlaylistsTable =() => {
  const { playlists, playlistsLoadingError } = useFetchPlaylists();

  if (playlistsLoadingError) {
    return <div>{playlistsLoadingError}</div>;
  }

  return (
    <div>
      {playlists.map((playlist) => {
        const movielist = useFetchMovies(playlist.name);
        return <PlaylistRow key={playlist.name} playlist={playlist.playlistname} movielist={movielist} Addmovie={Addmovie} />;
      })}
    </div>
  );
};

export default PlaylistsTable
