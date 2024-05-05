import typeorm from 'typeorm';

const User = new typeorm.EntitySchema({
  name: 'User',
  columns: {
    id: {
      primary: true,
      generated : 'uuid',
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    firstname: { type: String },
    lastname: { type: String },
    //avatar est une liste de string, par défaut, avatar contient 25 fois l'exadécimale correspondant à la couleur noir
    //avatar: {type: String, array:true, default: Array(25).fill('#000000')},
    avatar: {
      type: 'varchar',
      isArray: true,
      default: Array(25).fill('#000000'),
    },
    hash: {
      type: 'varchar',
    },
  },
});

export default User;
