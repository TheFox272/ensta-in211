import './Playlists.css';
import AddPlaylistForm from '../../components/AddPlaylistForm/AddPlaylistForm';
import PlaylistsTable from '../../components/PlaylistsTable/PlaylistsTable';

function Playlists() {
  return (
    <div className="Playlists-container">
      <h1>Ma bibliothèque de film</h1>
      <AddPlaylistForm />
      <PlaylistsTable />
    </div>
  );
}

export default Playlists;
