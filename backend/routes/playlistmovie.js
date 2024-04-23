import express from 'express';
import { appDataSource } from '../datasource.js';
import PlaylistMovies from '../entities/playlistmovie.js';

const playlistmovieRouter = express.Router();

const getAllPlaylistMovies = async (req, res) => {
    try {
        const playlistmovieRepository = appDataSource.getRepository(PlaylistMovies);
        const playlistmovie = await preferenceRepository.find();
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error okkkk' });
    }
};

playlistmovieRouter.get("/", getAllPlaylistMovies);

const createPlaylistmovie= async (req, res) => {
    try {
        const playlistmovieRepository = appDataSource.getRepository(PlaylistMovies);

        // Check if the playlistmovie exists
        console.log("Movie Id:", req.body.movieId);
        const playlistmovieId = await playlistmovieRepository.findOneBy({ movieId: req.body.movieId });

        // If the movie doesn't exist, return a 404 response
        if (!playlistmovieId) {
            res.status(404).json({ message: 'Playlistmovie not found' });
            return;
        }

        // Create the preference with the movie ID
        const newPlaylistmovie = playlistRepository.create({
            playlistId:req.body.playlistId,
            movieId:req.body.movieId
        });

        // Save the preference
        const savedPlaylistmovie = await playlistmovieRepository.save(newPlaylistmovie);

        // Return the created preference
        res.status(201).json(savedPlaylistmovie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while creating the playlistmovie' });
    }
};

playlistmovieRouter.post("/new", createPlaylistmovie);

playlistmovieRouter.delete("/:playlistmovieId", function (req, res) {
    appDataSource
        .getRepository(PlaylistMovies)
        .delete({ id: req.params.playlistmovieId})
        .then(function () {
            res.status(204).json({ message: 'Playlistmovie successfully deleted' });
        })
        .catch(function () {
            res.status(500).json({ message: 'Error while deleting the playlistmovie' });
        });
});

export default playlistmovieRouter;