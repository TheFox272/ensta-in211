import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      type: Number,
    },
    title: { type: String },
    year: { type: Number },
  },
});

export default Movie;
