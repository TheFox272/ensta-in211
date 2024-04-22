import typeorm from 'typeorm';

const PlaylistMovies = new typeorm.EntitySchema({
  name: 'PlaylistMovies',
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
    /*userId: {
      type: String,
    },*/
  },
  relations: {
    playlist: {
      target: 'Playlist',
      type: 'many-to-one',
      joinColumn: {name: 'playlistname', referencedColumnName: 'playlistname'},
      onDelete: 'CASCADE',
    },
    /*user: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: {name: 'playlistname', referencedColumnName: 'playlistname'},
      onDelete: 'CASCADE',
    },*/
  },
});

export default PlaylistMovies;