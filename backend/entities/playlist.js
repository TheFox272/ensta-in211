import typeorm from 'typeorm';

const Playlist = new typeorm.EntitySchema({
  name: 'Playlist', 
  columns: {
    id: {
      primary: true,
      generated: 'uuid',
      type: String,
    },
    playlistname: {
      type: String,
      unique: true,
    },
    userId: {
      type: String,
    },
  }
});

export default Playlist;