import express from 'express';
import { appDataSource } from '../datasource.js';
import Preferences from '../entities/preferences.js';
import Movie from '../entities/movie.js';

const preferencesRouter = express.Router();

const getAllPreferences = async (req, res) => {
    try {
        const preferenceRepository = appDataSource.getRepository(Preferences);
        const preference = await preferenceRepository.find();
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while fetching comments' });
    }
};

preferencesRouter.get("/", getAllPreferences);

const createPreference= async (req, res) => {
    try {
        const preferenceRepository = appDataSource.getRepository(Preferences);

        // Check if the movie exists
        console.log("Movie ID:", req.body.movieId);
        const movie = await movieRepository.findOneBy({ id: req.body.movieId });

        // If the movie doesn't exist, return a 404 response
        if (!movie) {
            res.status(404).json({ message: 'Movie not found' });
            return;
        }

        // Create the preference with the movie ID
        const newPreference = preferenceRepository.create({
            movieId: movie.id,
            review: comment
            date: new Date()

        });

        // Save the preference
        const savedPreference = await preferenceRepository.save(newPreference);

        // Return the created preference
        res.status(201).json(savedPreference);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while creating the comment' });
    }
};

commentsRouter.post("/new", createPreference);

commentsRouter.delete("/:commentId", function (req, res) {
    appDataSource
        .getRepository(Preferences)
        .delete({ id: req.params.commentId })
        .then(function () {
            res.status(204).json({ message: 'Comment successfully deleted' });
        })
        .catch(function () {
            res.status(500).json({ message: 'Error while deleting the comment' });
        });
});

export default commentsRouter;