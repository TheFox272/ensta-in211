import React from 'react'
import "./EditPopup.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SliderButton } from '../sliderButton/SliderButton'
import { AvatarButton } from '../AvatarButton/AvatarButton'
import GridAvatar from '../GridAvatarButton/GridAvatar'

export const EditPopup = ({ closePopup, userName }) => {
    const color = []
    for (let i = 0; i < 25; i++) {
        color.push("#ffffff")
    }
    return (
        <div className="editpopupOuter">
            <div className="editpopup">
                <div className="editleftSide">
                    <h2>Customize Avatar</h2>
                    <div className="editAvatar">
                        {/* <AvatarButton value={1} color={'#ff5733'}></AvatarButton> */}
                        <GridAvatar color={color} ></GridAvatar>
                    </div>
                </div>
                <div className="editrightSide">
                    <h2>Username</h2>
                    <p>{userName}</p>
                </div>
            </div>
            <div className="closeButton">
                <SliderButton clickFunction={closePopup} label={"Close"}></SliderButton>
            </div>

        </div >
    )
}
