import express from 'express';
import { appDataSource } from '../datasource.js';
import Comment from '../entities/comment.js';
import Movie from '../entities/movie.js';
import Vote from '../entities/vote.js';

const commentsRouter = express.Router();

const getAllComments = async (req, res) => {
    try {
        const commentRepository = appDataSource.getRepository(Comment);
        const comments = await commentRepository.find();
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while fetching comments' });
    }
};

commentsRouter.get("/", getAllComments);

const getCommentByCommentId = async (req, res) => {
    try {
        const commentRepository = appDataSource.getRepository(Comment);
        const comment = await commentRepository.findOneBy({ id: req.params.commentId });
        res.json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while fetching the comment' });
    }
};
commentsRouter.get("/:commentId", getCommentByCommentId);

const getCommentsByMovieId = async (req, res) => {
    try {
        const commentRepository = appDataSource.getRepository(Comment);
        const comments = (await commentRepository.find({where:{movieId: req.params.movieId}}))
        console.log("movie id : ", req.params.movieId, typeof req.params.movieId)
        console.log(comments)
        res.json(comments);
    } catch (error) {
        console.log("error")
        console.error(error);
        res.status(500).json({ message: 'Error while fetching comments' });
    }

}

commentsRouter.get("/movie/:movieId", getCommentsByMovieId);


const createCommentWithMovie = async (req, res) => {
    try {
        const commentRepository = appDataSource.getRepository(Comment);
        const movieRepository = appDataSource.getRepository(Movie);

        // Check if the movie exists
        console.log("Movie ID:", req.body.movieId);
        const movieId = await req.body.movieId;
        var movie = await movieRepository.findOneBy({ id: movieId });
        
        // Create the comment with the movie ID
        const newComment = commentRepository.create({
            movieId: movieId,
            content: req.body.content,
            date: new Date(),
            author: req.body.author
        });

        // If the movie doesn't exist, we create it, and then we create the comment
        if (!movie) {
            const movieRepository = appDataSource.getRepository(Movie);
            const newMovie = movieRepository.create({
                id: req.body.movieId,
                title: "titre temporaire",
                year: 0
            });
        
            movieRepository
                .insert(newMovie)
                .then(function (newDocument) {
                    res.status(201).json(newDocument);


                })
                .catch(function (error) {
                    console.error(error);
                    res.status(500).json({ message: 'Error while creating the movie' });
                });

            // Save the comment
            const savedComment = await commentRepository.save(newComment);
    
            // Return the created comment => impossible for some reason
            // res.status(201).json(savedComment);

        } else { // If the movie exists, we create the comment

            // Save the comment
            const savedComment = await commentRepository.save(newComment);
    
            // Return the created comment
            res.status(201).json(savedComment);
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while creating the comment' });
    }
};

commentsRouter.post("/new", createCommentWithMovie);

commentsRouter.delete("/:commentId", function (req, res) {
    appDataSource
        .getRepository(Comment)
        .delete({ id: req.params.commentId })
        .then(function () {
            res.status(204).json({ message: 'Comment successfully deleted' });
        })
        .catch(function () {
            res.status(500).json({ message: 'Error while deleting the comment' });
        });
});

const deleteAllComments = async (req, res) => {
    try {
        const commentRepository = appDataSource.getRepository(Comment);
        await commentRepository.clear();
        res.status(204).json({ message: 'All comments successfully deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while deleting all comments' });
    }
}

commentsRouter.delete("/", deleteAllComments);

const addUpvote = async (req, res) => {
    try {
        const commentRepository = appDataSource.getRepository(Comment);
        const comment = await commentRepository.findOneBy({ id: req.params.commentId });
        comment.votes = 1;
        await commentRepository.save(comment);
        res.json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while adding an upvote' });
    }
}

commentsRouter.put("/:commentId/upvote", addUpvote);

const addDownvote = async (req, res) => {
    try {
        const commentRepository = appDataSource.getRepository(Comment);
        const comment = await commentRepository.findOneBy({ id: req.params.commentId });
        comment.votes = -1;
        await commentRepository.save(comment);
        res.json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while adding a downvote' });
    }
}

commentsRouter.put("/:commentId/downvote", addDownvote);

const getVotesOfComment = async (req, res) => {
    try {
        const voteRepository = appDataSource.getRepository(Vote);
        const votes = await voteRepository.find({where:{commentId: req.params.commentId}});
        let upvotes = 0;
        let downvotes = 0;
        for (const vote of votes) {
            if (vote.upOrDown === 'up') {
                upvotes++;
            } else {
                downvotes++;
            }
        }
        res.json({ upvotes, downvotes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while fetching votes' });
    }
}

commentsRouter.get("/:commentId/votes", getVotesOfComment);


const addUpvoteToComment = async (req, res) => {
    console.log(req.body)
    try {
        const voteRepository = appDataSource.getRepository(Vote);
        const commentRepository = appDataSource.getRepository(Comment);
        const comment = await commentRepository.findOneBy({ id: req.body.commentId });
        // const userId = req.body.userId;
        console.log(comment);
        const vote = voteRepository.create({
            upOrDown: 'up',
            commentId: comment.id,
            userId: req.body.userId,
        });
        await voteRepository.save(vote);
        res.json(vote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while adding an upvote to the comment' });
    }
}

commentsRouter.post("/upvote", addUpvoteToComment);

const addDownvoteToComment = async (req, res) => {
    try {
        const voteRepository = appDataSource.getRepository(Vote);
        const commentRepository = appDataSource.getRepository(Comment);
        const comment = await commentRepository.findOneBy({ id: req.body.commentId });
        const vote = voteRepository.create({
            upOrDown: 'down',
            commentId: comment.id,
            userId: req.body.userId,
        });
        await voteRepository.save(vote);
        res.json(vote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while adding a downvote to the comment' });
    }
}

commentsRouter.post("/downvote", addDownvoteToComment);

const userHasVoted = async (req, res) => {
    try {
        const voteRepository = appDataSource.getRepository(Vote);
        const vote = await voteRepository.findOneBy({ commentId: req.params.commentId, userId: req.params.userId });
        if(vote) {
            res.json({hasVoted: vote.upOrDown})
        } else {
            res.json({ hasVoted: "noVote" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while fetching the vote' });
    }
}

commentsRouter.get("/:commentId/user/:userId", userHasVoted);


// const deleteAllVotes = async (req, res) => {
//     try {
//         const voteRepository = appDataSource.getRepository(Vote);
//         await voteRepository.clear();
//         res.status(204).json({ message: 'All comments successfully deleted' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error while deleting all comments' });
//     }
// }

// commentsRouter.delete("/votes", deleteAllVotes);


export default commentsRouter;


