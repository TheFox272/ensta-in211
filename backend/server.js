import express from 'express';
import path from 'path';
import logger from 'morgan';
import cors from 'cors';
import usersRouter from './routes/users.js';
import moviesRouter from './routes/movies.js';
import commentsRouter from './routes/comments.js';
import playlistRouter from './routes/playlist.js';
import playlistmovieRouter from './routes/playlistmovie.js';
import playlistmovienewRouter from './routes/playlistmovienew.js';
import authRouter from './routes/auth.js';
import { routeNotFoundJsonHandler } from './services/routeNotFoundJsonHandler.js';
import { jsonErrorHandler } from './services/jsonErrorHandler.js';
import { appDataSource } from './datasource.js';
// import {config as dotenvConfig} from 'dotenv';

const apiRouter = express.Router();
appDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    const app = express();

    app.use(logger('dev'));
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    
    // Register routes
    // apiRouter.get('/', (req, res) => {
    //   res.send('Hello from Express!');
    //   res.setHeader('Access-Control-Allow-Origin', '*');
    // });
    apiRouter.use('/users', usersRouter);
    apiRouter.use('/movies', moviesRouter);
    apiRouter.use('/comments', commentsRouter);
    apiRouter.use('/playlistmovienew', playlistmovienewRouter);
    apiRouter.use('/playlist', playlistRouter);
    apiRouter.use('/playlistmovie', playlistmovieRouter);
    apiRouter.use('/auth', authRouter);
    
    // Register API router
    app.use('/api', apiRouter);
    
    // Register frontend
    const publicPath = new URL('./public', import.meta.url).pathname;
    app.use(express.static(publicPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(publicPath, 'index.html'));
    });

    // Register 404 middleware and error handler
    app.use(routeNotFoundJsonHandler); // this middleware must be registered after all routes to handle 404 correctly
    app.use(jsonErrorHandler); // this error handler must be registered after all middleware to catch all errors

    const port = parseInt(process.env.PORT || '8080');

    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
