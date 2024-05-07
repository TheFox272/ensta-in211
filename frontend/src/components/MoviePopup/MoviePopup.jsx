import React, { useState, useEffect } from 'react'
import "./MoviePopup.css"
import noPosterImage from "../../pages/Home/noPoster.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SliderButton } from '../sliderButton/SliderButton'
import { CommentBubble } from '../commentBubble/CommentBubble'
import { NewCommentBar } from '../newCommentBar/NewCommentBar'
import axios from 'axios'

export const MoviePopup = ({ movie, closePopup}) => {

    const [commentsSection, setCommentsSection] = useState(false);
    const [comments, setComments] = useState([]);
    const [refreshComments, setRefreshComments] = useState(1)

    const toggleCommentSection = () => setCommentsSection(!commentsSection);

    const incrementRefreshComments = () => setRefreshComments(refreshComments + 1);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BACKDEND_URL}/comments/movie/${movie.id}`)
            .then((response) => {
                setComments(response.data)
            })
            .catch((error) => { console.error(error) })
    }, [refreshComments])

    const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : noPosterImage
    return (
        <div className="popupOuter">
            <div className="popup">
                <div className="leftSide">
                    <img src={imageUrl} alt={movie.title} />
                </div>
                <div className="rightSide">
                    {
                        commentsSection
                            ? <div className="comment-section">
                                <h1>Commentaires</h1>
                                <div className="comment-box">
                                    {comments.map( function (comment, index) {
                                        return <CommentBubble comments={comments} index={index} key={index} setComments={setComments}/>
                                    })}
                                </div>
                                <NewCommentBar movieId={movie.id} refreshComments={incrementRefreshComments} />
                            </div>
                            : <div className="overview">
                                <h1>{movie.title}</h1>
                                <p>Release Date : {formatDate(movie.release_date)}</p>
                                <p>{movie.overview}</p>
                            </div>
                    }
                    <div className="button-pack">
                        <SliderButton clickFunction={toggleCommentSection} label={commentsSection ? "Overview" : "Comments"}></SliderButton>
                        <SliderButton clickFunction={closePopup} label={"Close"}></SliderButton>
                    </div>
                </div>
            </div>
        </div>
    )
}
