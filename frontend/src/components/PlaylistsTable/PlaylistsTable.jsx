import { useEffect, useState } from 'react';
import axios from 'axios';
import './PlaylistsTable.css';
import PlaylistRow from '../PlaylistRow/PlaylistRow';
import useTokenVerification from '../VerifyToken/VerifyToken';


const useFetchPlaylists = (userId) => {
  const [playlists, setPlaylists] = useState([]);
  const [playlistsname, setPlaylistsname] = useState([]);
  const [playlistsLoadingError, setPlaylistsLoadingError] = useState(null);
  const { loggedIn, email, uid } = useTokenVerification();

  useEffect(() => {
    const fetchPlaylists = async () => {
      console.log("get playlists", uid);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKDEND_URL}/playlist/${uid}`);
        setPlaylists(response.data.playlists);
        const filteredPlaylists = response.data.playlists.map((playlist) => playlist.playlistname);
        setPlaylistsname(filteredPlaylists);
      } catch (error) {
        setPlaylistsLoadingError('An error occured while fetching playlists.');
        console.error(error);
      }
    };

    if (uid != "0") {
      fetchPlaylists();
    }
  }, [uid]);
  return { playlists, playlistsname, playlistsLoadingError };
};


const PlaylistsTable = ({ userId }) => {
  const { loggedIn, email, uid } = useTokenVerification();
  const { playlists, playlistsname, playlistsLoadingError } = useFetchPlaylists(uid);

  if (playlistsLoadingError) {
    return <div>{playlistsLoadingError}</div>;
  }

  return (
    <div>
      {playlists.map((playlist) => {
        return <PlaylistRow key={playlist.id} playlistname={playlist.playlistname} userId={uid} />;
      })}
    </div>
  );
};

export default PlaylistsTable;