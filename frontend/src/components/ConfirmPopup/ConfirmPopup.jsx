import React from 'react'
import "./ConfirmPopup.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SliderButton } from '../sliderButton/SliderButton'

export const ConfirmPopup = ({ closePopup, acceptPopup }) => {
    return (
        <div className="confpopupOuter">
            <div className="confpopup">
                <h1 className="conftitle">Êtes-vous sûr de vouloir vous déconnecter ?</h1>
                <div className="confbuttonContainer">
                    <SliderButton clickFunction={acceptPopup} label={"Yes"}></SliderButton>
                    <SliderButton clickFunction={closePopup} label={"No"}></SliderButton>
                </div>
            </div>
        </div>
    )
}
