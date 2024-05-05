import typeorm from 'typeorm';

const PlaylistMoviesNew = new typeorm.EntitySchema({
  name: 'PlaylistMoviesNew',
  columns: {
    id: {
      primary: true,
      generated: 'uuid',
      type: String,
    },
    playlistname: {
      type: String, 
    },
    movieId: {
      type: String,
    },
    userId: {
      type: String,
    },
  },
});

export default PlaylistMoviesNew;