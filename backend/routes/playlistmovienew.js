import express from 'express';
import { appDataSource } from '../datasource.js';
import PlaylistMoviesNew from '../entities/playlistmovienew.js';

const playlistmovienewRouter = express.Router();

playlistmovienewRouter.get('/getAll', function (req, res) {
    appDataSource
      .getRepository(PlaylistMoviesNew)
      .find({})
      .then(function (playlistmoviesnew) {
        res.json({ playlistmoviesnew: playlistmoviesnew });
      });
  });

playlistmovienewRouter.get('/getByName/:playlistname', function (req, res) {
    const playlistname = req.params.playlistname;
    appDataSource
        .getRepository(PlaylistMoviesNew)
        .find({where:{playlistname: playlistname}})
        .then(function (playlistmoviesnew) {
        res.json({ playlistmoviesnew: playlistmoviesnew });
        })
        .catch(function (error) {
        res.status(500).json({ error: error });
        });
});

playlistmovienewRouter.get('/getByNameAndMovieId/:playlistname/:movieId/:userId', function (req, res) {
    const playlistname = req.params.playlistname;
    const movieId = req.params.movieId;
    const userId = req.params.userId;
    appDataSource
        .getRepository(PlaylistMoviesNew)
        .find({where:{playlistname: playlistname, movieId:movieId,userId:userId}})
        .then(function (playlistmoviesnew) {
        res.json({ playlistmoviesnew: playlistmoviesnew });
        })
        .catch(function (error) {
        res.status(500).json({ error: error });
        });
});

const createPlaylistmovienew= async (req, res) => {
    try {
        const playlistmovienewRepository = appDataSource.getRepository(PlaylistMoviesNew);

        // Check if the playlistmovie exists
        const playlistmovieId = await playlistmovienewRepository.findOneBy({ playlistname:req.body.playlistname, movieId: req.body.movieId, userId: req.body.userId});

        // If the movie exists, return a 404 response
        if (playlistmovieId) {
            res.status(404).json({ message: 'Playlistmovie already exists' });
            return;
        }

        // Create the preference with the movie ID
        const newPlaylistmovienew = playlistmovienewRepository.create({
            playlistname:req.body.playlistname,
            movieId:req.body.movieId,
            userId:req.body.userId
        });

        // Save the preference
        const savedPlaylistmovienew = await playlistmovienewRepository.save(newPlaylistmovienew);

        // Return the created preference
        res.status(201).json(savedPlaylistmovienew);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while creating the playlistmovienewww' });
    }
};

playlistmovienewRouter.post("/new", createPlaylistmovienew);

playlistmovienewRouter.delete("/:playlistmovienewId", function (req, res) {
    appDataSource
        .getRepository(PlaylistMoviesNew)
        .delete({ id: req.params.playlistmovienewId})
        .then(function () {
            res.status(204).json({ message: 'Playlistmovie successfully deleted' });
        })
        .catch(function () {
            res.status(500).json({ message: 'Error while deleting the playlistmovie' });
        });
});

export default playlistmovienewRouter;