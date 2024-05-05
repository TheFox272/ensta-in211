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
  relations: {
    playlist: {
      target: 'Playlist',
      type: 'many-to-one',
      joinColumn: {name: 'playlistname', referencedColumnName: 'playlistname'},
      onDelete: 'CASCADE',
    },
  },
});

export default PlaylistMoviesNew;