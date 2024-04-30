import express from 'express';
import { appDataSource } from '../datasource.js';
import PlaylistMovies from '../entities/playlistmovie.js';

const playlistmovieRouter = express.Router();

playlistmovieRouter.get('/getAll', function (req, res) {
    appDataSource
      .getRepository(PlaylistMovies)
      .find({})
      .then(function (playlistmovies) {
        res.json({ playlistmovies: playlistmovies });
      });
  });

playlistmovieRouter.get('/playlistname/:playlistname', function (req, res) {
    appDataSource
      .getRepository(PlaylistMovies)
      .find({ playlistname: req.params.playlistname })
      .then(function (playlistmovies) {
        res.json({ playlistmovies: playlistmovies });
      })
      .catch(function () {
        res.status(500).json({ message: 'Error while retrieving playlistmovies' });
      });
});

const createPlaylistmovie= async (req, res) => {
    try {
        const playlistmovieRepository = appDataSource.getRepository(PlaylistMovies);

        // Check if the playlistmovie exists
        const playlistmovieId = await playlistmovieRepository.findOneBy({ playlistname:req.body.playlistname, movieId: req.body.movieId});

        // If the movie exists, return a 404 response
        if (playlistmovieId) {
            res.status(404).json({ message: 'Playlistmovie already exists' });
            return;
        }

        // Create the preference with the movie ID
        const newPlaylistmovie = playlistmovieRepository.create({
            playlistname:req.body.playlistname,
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