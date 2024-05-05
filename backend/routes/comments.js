import express from 'express';
import { appDataSource } from '../datasource.js';
import Comment from '../entities/comment.js';
import Movie from '../entities/movie.js';

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
            date: new Date()
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

export default commentsRouter;


