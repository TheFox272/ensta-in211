import typeorm from 'typeorm';
import Movie from './movie.js';
import Comment from './comment.js';

const Preferences = new typeorm.EntitySchema({
  name: 'Preferences',
  columns: {
    id: {
      primary: true,
      generated: 'uuid',
      type: String,
    },
    movieId: { // Clé étrangère pour la relation
        type: String,
    },
    film_name:{
        type: String,
    },
    date: {
      type: String,
    },
    rate: { 
        type: Number,
        default: 0, 
    },
    review:{
        type: String,
    }
  },
  relations: {
    movie: {
      target: "Movie", // Le nom de l'entité cible
      type: "many-to-one",
      joinColumn: {
        name: "movieId",
        referencedColumnName: "id" // La colonne dans `Movie` que cette relation référence
      },
      cascade: true, // Optionnel: pour des opérations en cascade
      // Vous pouvez aussi ajouter `eager: true` si vous voulez toujours charger les films avec les préférences
    }
    comment: { 
        type: 'many-to-one',
        target: 'Comment',
        joinColumn: true,
        onDelete: 'CASCADE',
    },
  }
});

export default Preferences;