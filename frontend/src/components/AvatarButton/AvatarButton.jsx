import "./AvatarButton.css"
import React from 'react'
import { useState } from 'react'

/*
export const AvatarButton = ({ color, updateButtonColor }) => {
    const [tmpColor, setTmpColor] = useState(color)
    const [backgroundColor, setBackgroundColor] = useState('#0'); // État local pour la couleur de fond

    const handleClick = () => {
        // Générez une couleur aléatoire (ou remplacez-la par votre propre logique pour changer la couleur)
        setBackgroundColor(tmpColor);
        updateButtonColor(tmpColor)
    };

    const handleHover = () => {
        // Générez une couleur aléatoire (ou remplacez-la par votre propre logique pour changer la couleur)
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        setTmpColor(color);
    }


    return (
        <button onMouseOver={handleHover} onClick={handleClick} style={{ backgroundColor: backgroundColor }} className="avatarButton" >
            <div className="background-slider" style={{ backgroundColor: tmpColor }}></div>
        </button >
    )
}
*/

export const AvatarButton = ({ color, index, updateButtonColors }) => {
    const [tmpColor, setTmpColor] = useState(color);
    const [backgroundColor, setBackgroundColor] = useState('#0');

    const handleClick = () => {
        setBackgroundColor(tmpColor);
        console.log("Index: " + index + " Color: " + tmpColor);
        updateButtonColors(tmpColor, index); // Pass index and updated color back to the parent component
    };

    const handleHover = () => {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        setTmpColor(randomColor); // Update tmpColor with random color on hover
    };

    return (
        <button onMouseOver={handleHover} onClick={handleClick} style={{ backgroundColor: backgroundColor }} className="avatarButton">
            <div className="background-slider" style={{ backgroundColor: tmpColor }}></div>
        </button>
    );
};
