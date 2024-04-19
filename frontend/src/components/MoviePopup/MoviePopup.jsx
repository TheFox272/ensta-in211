import React from 'react'
import "./MoviePopup.css"
import noPosterImage from "../../pages/Home/noPoster.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export const MoviePopup = ({movie}) => {

    const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : noPosterImage
    return (
        <div className="popupOuter">
            <div className="popup">
                <div className="leftSide">
                    <img src={imageUrl} alt={movie.title} />
                </div>
                <div className="rightSide">
                    <h1>{movie.title}</h1>
                    <p>{movie.overview}</p>
                    <button className='close-button'>Fermer</button>
                </div>
            </div>
        </div>
    )
}
