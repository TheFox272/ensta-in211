import { useEffect, useState } from 'react';
import axios from 'axios';
import './PlaylistRow.css';
import MovieItem from '../../pages/Home/MovieItem';
import { MoviePopup } from '../MoviePopup/MoviePopup';

const PlaylistRow = ({playlistname,movielist,}) => {
    return (
        <div className="playlistRow">
            <h2 className="playlistRow__title">{playlistname}</h2>
            <div className="playlistRow__movies">
                {movielist.map((movie) => (
                    <MovieItem
                        key={movie.id}
                        movie={movie}
                    />
                ))}
                <div className="playlistRow__addMovie">
                    <button className="playlistRow__addButton" onClick={() => handleAddMovie(movie)}>
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PlaylistRow