import { useState } from 'react';
import axios from 'axios';
import './AddPlaylistForm.css';

const DEFAULT_FORM_VALUES = {
  playlistname: '',
  userId: '',
};

const useSavePlaylist = () => {
  const [playlistCreationError, setPlaylistCreationError] = useState(null);
  const [playlistCreationSuccess, setPlaylistCreationSuccess] = useState(null);
  const displayCreationSuccessMessage = () => {
    setPlaylistCreationSuccess('New playlist created successfully');
    setTimeout(() => {
      setPlaylistCreationSuccess(null);
    }, 3000);
  };


  const savePlaylist = (event, formValues, setFormValues) => {
    event.preventDefault();

    setPlaylistCreationError(null);
    if (formValues.playlistname === '') {
      console.error('Missing playlist name, this field is required');
      return;
    }
    console.log('formValues', formValues);
    axios
      .post(`${import.meta.env.VITE_BACKDEND_URL}/playlist/new`, formValues)
      .then(() => {
        displayCreationSuccessMessage();
        setFormValues(DEFAULT_FORM_VALUES);
        window.location.reload();
      })
      .catch((error) => {
        setPlaylistCreationError('An error occured while creating new user.');
        console.error(error);
      });
  };

  return { savePlaylist, playlistCreationError, playlistCreationSuccess };
};

function AddPlaylistForm(userId) {
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);
  const { savePlaylist, playlistCreationError, playlistCreationSuccess } = useSavePlaylist();

  return (
    <div>
      <form
        className="add-playlist-form"
        onSubmit={(event) => savePlaylist(event, formValues, setFormValues)}
      >
        <input
          className="add-playlist-input"
          type="Nom de la playlist"
          placeholder="Nom de la playlist"
          value={formValues.playlistname}
          onChange={(event) =>
            setFormValues({ ...formValues, playlistname: event.target.value, userId: userId})
          }
        />
        <button className="add-playlist-button" type="submit">
          Add playlist
        </button>
      </form>
      {playlistCreationSuccess !== null && (
        <div className="playlist-creation-success">{playlistCreationSuccess}</div>
      )}
      {playlistCreationError !== null && (
        <div className="playlist-creation-error">{playlistCreationError}</div>
      )}
    </div>
  );
}

export default AddPlaylistForm;
