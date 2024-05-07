import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movie.js';

const moviesRouter = express.Router();

// Callback function to handle GET request for fetching all movies
const getAllMovies = async (req, res) => {
    try {
        // Get movie repository
        const movieRepository = appDataSource.getRepository(Movie);
        // Fetch all movies from database
        const movies = await movieRepository.find();
        // Send the movies as response
        res.json(movies);
    } catch (error) {
        // If an error occurs, send an error response
        console.error(error);
        res.status(500).json({ message: 'Error while fetching movies' });
    }
};

moviesRouter.get("/", getAllMovies);

moviesRouter.post("/new", function (req, res) {
    const movieRepository = appDataSource.getRepository(Movie);
    const newMovie = movieRepository.create({
        id: req.body.id,
        title: req.body.title,
        year: req.body.year
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
});

moviesRouter.delete("/:movieId", function (req, res) {
    appDataSource
        .getRepository(Movie)
        .delete({ id: req.params.movieId })
        .then(function () {
            res.status(204).json({ message: 'Movie successfully deleted' });
        })
        .catch(function () {
            res.status(500).json({ message: 'Error while deleting the movie' });
        });
});

moviesRouter.delete("/", function (req, res) {
    appDataSource
        .getRepository(Movie)
        .clear()
        .then(function () {
            res.status(204).json({ message: 'All movies successfully deleted' });
        })
        .catch(function () {
            res.status(500).json({ message: 'Error while deleting all movies' });
        });
});

export default moviesRouter;


