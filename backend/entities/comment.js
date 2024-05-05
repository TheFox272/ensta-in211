import typeorm from 'typeorm';
import Movie from './movie.js'; // Import the Movie entity

const Comment = new typeorm.EntitySchema({
  name: 'Comment',
  columns: {
    id: {
      primary: true,
      generated: 'uuid',
      type: String,
    },
    movieId: { type: Number },
    content: { type: String },
    date: { type: Date },
    upVotes: { 
      type: Number,
      default: 0, // Set default value to 0
    },
    downVotes: { 
      type: Number,
      default: 0, // Set default value to 0
    },
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
