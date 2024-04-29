import React, { useState } from 'react'
import "./MoviePopup.css"
import noPosterImage from "../../pages/Home/noPoster.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SliderButton } from '../sliderButton/SliderButton'
import { CommentBubble } from '../commentBubble/CommentBubble'

export const MoviePopup = ({movie, closePopup}) => {

    const [commentsSection, setCommentsSection] = useState(false);
    const [comments, setComments] = useState([
        { author: "Jean", content: "Super film !" },
        { author: "Fab", content: "Nul !" },
        { author: "Agathe", content: "J'ai adoré !" },
        { author: "Lucas", content: "Le meilleur film que j'ai jamais vu ! C'était complètement fou !" },
        { author: "Emma", content: "Je n'ai pas aimé du tout." },
        { author: "John", content: "Great movie!" },
        { author: "Sarah", content: "I didn't like it." },
        { author: "Michael", content: "Highly recommended!" }
    ]);

    const toggleCommentSection = () => setCommentsSection(!commentsSection);

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
                    {
                        commentsSection
                        ? <div className="comment-section">
                            <h1>Commentaires</h1>
                            <div className="comment-box">
                                {comments.map((comment, index) => <CommentBubble comment={comment} key={index}/>)}
                            </div>
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
