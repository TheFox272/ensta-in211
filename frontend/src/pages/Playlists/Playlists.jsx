import './Playlists.css';
import AddPlaylistForm from '../../components/AddPlaylistForm/AddPlaylistForm';
import PlaylistsTable from '../../components/PlaylistsTable/PlaylistsTable';

function Playlists(userId) {
  return (
    <div className="Playlists-container">
      <h1>Ma bibliothèque de film</h1>
      <AddPlaylistForm userId={userId}/>
      <PlaylistsTable userId={userId}/>
    </div>
  );
}

export default Playlists;
