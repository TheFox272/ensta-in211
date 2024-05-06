import './Playlists.css';
import AddPlaylistForm from '../../components/AddPlaylistForm/AddPlaylistForm';
import PlaylistsTable from '../../components/PlaylistsTable/PlaylistsTable';
import useTokenVerification from '../../components/VerifyToken/VerifyToken';



function Playlists({ userId }) {
  const { loggedIn, email, uid } = useTokenVerification();
  console.log("email", email);
  console.log("uid", uid);
  return (

    <div className="Playlists-container">
      {loggedIn === false ? (
        <div className="Message">Connectez-vous pour accéder à vos bibliothèques</div>
      ) : (
        <>
          <h1>Ma bibliothèque de film</h1>
          <AddPlaylistForm userId={userId} />
          <PlaylistsTable userId={userId} />
        </>
      )}
    </div>
  );
}

export default Playlists;
