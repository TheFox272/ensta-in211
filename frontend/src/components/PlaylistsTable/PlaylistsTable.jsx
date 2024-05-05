import { useEffect, useState } from 'react';
import axios from 'axios';
import './PlaylistsTable.css';
import PlaylistRow from '../PlaylistRow/PlaylistRow';


const useFetchPlaylists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [playlistsname, setPlaylistsname] = useState([]);
  const [playlistsLoadingError, setPlaylistsLoadingError] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKDEND_URL}/playlist`)
      .then((response) => {
        setPlaylists(response.data.playlists);
        const filteredPlaylists = response.data.playlists.map((playlist) => playlist.playlistname);
        setPlaylistsname(filteredPlaylists);
      })
      .catch((error) => {
        setPlaylistsLoadingError('An error occured while fetching playlists.');
        console.error(error);
      });
  }, []);
  return { playlists, playlistsname, playlistsLoadingError };
};


const PlaylistsTable = () => {
  const { playlists, playlistsname, playlistsLoadingError } = useFetchPlaylists();

  if (playlistsLoadingError) {
    return <div>{playlistsLoadingError}</div>;
  }

  return (
    <div>
      {playlists.map((playlist) => {
        return <PlaylistRow key={playlist.id} playlistname={playlist.playlistname} />;
      })}
    </div>
  );
};

export default PlaylistsTable;