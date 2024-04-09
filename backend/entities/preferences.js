import typeorm from 'typeorm';

const Preferences = new typeorm.EntitySchema({
  name: 'Preferences',
  columns: {
    id: {
      primary: true,
      generated: 'uuid',
      type: String,
    },
    film_name:{
        type: String,
    },
    date: {
      type: String,
    },
    rate: { 
      type: String },
    review:{
        type: String,
    }
  },
});

export default Preferences;