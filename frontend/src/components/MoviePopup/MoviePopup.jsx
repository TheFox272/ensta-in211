import React from 'react'
import "./MoviePopup.css"
import noPosterImage from "../../pages/Home/noPoster.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SliderButton } from '../sliderButton/SliderButton'
export const MoviePopup = ({movie, closePopup}) => {


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : noPosterImage
    return (
        <div className="popupOuter">
            <div className="popup">
                <div className="leftSide">
                    <img src={imageUrl} alt={movie.title} />
                </div>
                <div className="rightSide">
                    <h1>{movie.title}</h1>
                    <p>Release Date : {formatDate(movie.release_date)}</p>
                    <p>{movie.overview}</p>
                    <SliderButton clickFunction={closePopup} label={"Close"}></SliderButton>
                </div>
            </div>
        </div>
    )
}
