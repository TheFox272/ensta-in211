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

function PlaylistsTable() {
  const { playlists, playlistsLoadingError } = useFetchPlaylists();

  const deletePlaylist = (playlistId) => {
    axios.delete(`${import.meta.env.VITE_BACKDEND_URL}/playlist/${playlistId}`);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {playlists.map((playlist) => (
            <tr key={playlist.email}>
              <td>{playlist.nameplaylist}</td>
              <td>{playlist.id}</td>
              <td>
                <button onClick={() => deletePlaylist(playlists.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {playlistsLoadingError !== null && (
        <div className="playlists-loading-error">{playlistsLoadingError}</div>
      )}
    </div>
  );
}

export default PlaylistsTable;
