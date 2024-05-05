import './Playlists.css';
import AddPlaylistForm from '../../components/AddPlaylistForm/AddPlaylistForm';
import PlaylistsTable from '../../components/PlaylistsTable/PlaylistsTable';

function Playlists({userId}) {
  return (
    <div className="Playlists-container">
      {userId === 0 ? (
        <p>Connectez-vous pour accéder à vos bibliothèques</p>
      ) : (
        <>
          <h1>Ma bibliothèque de film</h1>
          <AddPlaylistForm userId={userId}/>
          <PlaylistsTable userId={userId}/>
        </>
      )}
    </div>
  );
}

export default Playlists;
