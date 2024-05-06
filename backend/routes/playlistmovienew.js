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

playlistmovienewRouter.get('/getByName/:playlistname/:userId', function (req, res) {
    const playlistname = req.params.playlistname;
    appDataSource
        .getRepository(PlaylistMoviesNew)
        .find({where:{playlistname: playlistname, userId:req.params.userId}})
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
        const playlistmovieId = await playlistmovienewRepository.findOneBy({ playlistname:req.body.playlistname, movieId: req.body.movieId, userId: req.params.userId});

        // If the movie exists, return a 404 response
        if (playlistmovieId) {
            res.status(404).json({ message: 'Playlistmovie already exists' });
            return;
        }

        // Create the preference with the movie ID
        const newPlaylistmovienew = playlistmovienewRepository.create({
            playlistname:req.body.playlistname,
            movieId:req.body.movieId,
            userId:req.params.userId
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

playlistmovienewRouter.post("/new/:userId", createPlaylistmovienew);

playlistmovienewRouter.delete("/:playlistmovienewId/:userId", function (req, res) {
    appDataSource
        .getRepository(PlaylistMoviesNew)
        .delete({ id: req.params.playlistmovienewId,userId:req.params.userId})
        .then(function () {
            res.status(204).json({ message: 'Playlistmovie successfully deleted' });
        })
        .catch(function () {
            res.status(500).json({ message: 'Error while deleting the playlistmovie' });
        });
});

export default playlistmovienewRouter;