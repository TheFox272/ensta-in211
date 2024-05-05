import React, {useState} from 'react'
import './NewCommentBar.css'
import axios from 'axios'

const DEFAULT_COMMENT = {
    movieId: 0,
    content: '',
    date: new Date()
}


export const NewCommentBar = ({movieId, refreshComments}) => {

    const [newComment, setNewComment] = useState('');

    const handleCommentPost = (e) => {
        e.preventDefault();
        console.log("Clicked, ", movieId)

        if(newComment !== "") {
            axios
            .post(`${import.meta.env.VITE_BACKDEND_URL}/comments/new`, {
                movieId: movieId.toInteger,
                content: newComment,
                date: new Date()
            })
            .then(() => {
                console.log('Comment posted')
            })
            .catch((error) => {
                console.error(error)
            })
            setNewComment("");
            setTimeout(refreshComments, "200");
        }
    }

    return (
        <div className='new-comment-bar'>
            <form
                className='new-comment-form'
                onSubmit={(e) => handleCommentPost(e)}
            >
                <input
                    className='new-comment-input'
                    type="text"
                    placeholder='Ajoutez un commentaire'
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button className='post-comment-button' type='submit'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="#ffffff" d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/>
                    </svg>
                </button>
            </form>
            
        </div>
    )
}
