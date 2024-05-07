import typeorm from 'typeorm';
import Movie from './movie.js'; // Import the Movie entity

const Comment = new typeorm.EntitySchema({
  name: 'Comment',
  columns: {
    id: {
      primary: true,
      generated: 'uuid',
      type: 'uuid',
    },
    movieId: { type: Number },
    content: { type: String },
    date: { type: Date },
    author: { type: String },
  },
  relations: {
    movie: { 
      type: 'many-to-one',
      target: 'Movie',
      joinColumn: true,
      onDelete: 'CASCADE',
    },
  },
});

export default Comment;
