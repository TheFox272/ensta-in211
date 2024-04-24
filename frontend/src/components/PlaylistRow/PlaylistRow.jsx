import { useEffect, useState } from 'react';
import axios from 'axios';
import './PlaylistRow.css';
import MovieItem from '../../pages/Home/MovieItem';
import { MoviePopup } from '../MoviePopup/MoviePopup';

const PlaylistRow = ({playlistname,movielist,AddMovie}) => {

    useEffect(() => {  
        movielist=getMovies(moviename)
    },[moviename])

    const fetchMovies = async (url) => {
        try {
          const response = await fetch(url);
          const data = await response.json();
          setMovielist(data.results);
        } catch (error) {
          console.error('Error fetching movies:', error);
        }
      };
    
    const getMovies = async (query) => {
        const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&include_video=false&language=en-US&query=${query}&page=1&sort_by=popularity.desc&api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb`;
        await fetchMovies(url);
      };
    
    return (
        <div className="playlistRow">
            <h2 className="playlistRowtitle">{playlistname}</h2>
            <div className="playlistRowmovies">
                {movielist.map((moviename) => (
                    
                    <MovieItem
                        key={movie.id}
                        movie={movie}
                    />
                ))}
                <div className="playlistRowaddMovie">
                    <button className="playlistRowaddButton" onClick={() => AddMovie(movie)}>
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PlaylistRow