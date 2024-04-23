import { useState, useEffect } from 'react';
import './Playlists.css';
import axios from 'axios';
import { SliderButton } from '../../components/sliderButton/SliderButton';

function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKDEND_URL}/playlist/`); 
        setPlaylists(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    }

    fetchPlaylists();
  }, []);

  const handleCreatePlaylist = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKDEND_URL}/playlist/new`, {"playlistname": newPlaylistName, "userId": '12'})
      setPlaylists([...playlists, response.data]); 
      setNewPlaylistName('');
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  return (
    <div className="playlist-library">
      <h1>Ma Bibliothèque de Films</h1>
      <div className="playlists">
        {playlists.map((playlist, index) => (
          <div key={index} className="playlist">
            <h2>{playlist.playlistname}</h2>
            <ul className="movies">
              {playlist.movies.map((movie, index) => (
                <li key={index}>{movie.title}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="create-playlist">
        <input
          type="text"
          placeholder="Nom de la nouvelle playlist"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
        />
        <button onClick={handleCreatePlaylist}>Créer Playlist</button>
      </div>
    </div>
  );
}

export default Playlists;
