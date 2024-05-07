import typeorm from 'typeorm';
import Comment from './comment.js';
import User from './user.js';

const Vote = new typeorm.EntitySchema({
    name: 'Vote',
    columns: {
        id: {
            primary: true,
            type: 'uuid', // Assuming id is a UUID
            generated: 'uuid',
        },
        upOrDown: { type: String },
        commentId: { type: 'uuid' }, // Corrected to match the type of the id column in Comment
        userId: { type: 'uuid' },
    },
    relations:{
        // comment: {
        //     type: 'many-to-one',
        //     target: 'Comment',
        //     joinColumn: true,
        //     onDelete: 'CASCADE',
        // },
        // user: {
        //     type: 'many-to-one',
        //     target: 'User',
        //     joinColumn: true,
        //     onDelete: 'CASCADE',
        // },
    },
});

export default Vote;
