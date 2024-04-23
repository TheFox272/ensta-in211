import express from 'express';
import { appDataSource } from '../datasource.js';
import Playlist from '../entities/playlist.js';

const playlistRouter = express.Router();

playlistRouter.get('/', function (req, res) {
    appDataSource
      .getRepository(Playlist)
      .find({})
      .then(function (playlists) {
        res.json({ playlists: playlists });
      });
  });

const createPlaylist= async (req, res) => {
    try {
        const playlistRepository = appDataSource.getRepository(Playlist);
        
        // Check if the playlist exists, return a 404 response
        console.log("Playlist name:", req.body.playlistname);
        const playlist = await playlistRepository.findOneBy( { playlistname: req.body.playlistname });
        if (playlist) {
            res.status(404).json({ message: 'Playlist already exists' });
            return;
        }

        // Create the preference with the movie ID
        const newPlaylist = playlistRepository.create({
            playlistname: req.body.playlistname,
            userId: req.body.userId
        });

        // Save the preference
        const savedPlaylist = await playlistRepository.save(newPlaylist);

        // Return the created preference
        res.status(201).json(savedPlaylist);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while creating the comment' });
    }
};

playlistRouter.post("/new", createPlaylist);

playlistRouter.delete("/:playlistId", function (req, res) {
    appDataSource
        .getRepository(Playlist)
        .delete({ id: req.params.playlistId })
        .then(function () {
            res.status(204).json({ message: 'Playlist successfully deleted' });
        })
        .catch(function () {
            res.status(500).json({ message: 'Error while deleting the playlist' });
        });
});

export default playlistRouter;