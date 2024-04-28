
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SliderButton } from '../../components/sliderButton/SliderButton';
import { EditPopup } from "../../components/EditPopup/EditPopup";
import { ConfirmPopup } from "../../components/ConfirmPopup/ConfirmPopup";
import './Loginpage.css';


const Home = (props) => {
    const { loggedIn, email } = props
    const navigate = useNavigate();
    const [popupIsOpen, setPopupIsOpen] = useState(false)
    const [confirmPopupIsOpen, setConfirmPopupIsOpen] = useState(false)

    function togglePopup() {
        setPopupIsOpen(!popupIsOpen)
    }

    function toggleConfirmPopup() {
        setConfirmPopupIsOpen(!confirmPopupIsOpen)
    }


    function toggleAcceptPopup() {
        setConfirmPopupIsOpen(!confirmPopupIsOpen)
        localStorage.removeItem("user")
        props.setLoggedIn(false)
    }

    const onButtonClick = () => {
        if (loggedIn) {
            setConfirmPopupIsOpen(true, () => {
                //localStorage.removeItem("user")
                //props.setLoggedIn(false)
            });
        }
        else {
            navigate("/login")
        }
    }

    const onModifyButtonClick = () => {
        setPopupIsOpen(true)
    }


    return <div className="mainContainer">
        <div className={"titleContainer"}>
            <div>Welcome!</div>
        </div>

        <div className={"LogButtonContainer"}>
            <SliderButton clickFunction={onButtonClick} label={loggedIn ? "Log out" : "Log in"} />
            {(loggedIn ? <div>
                Your email address is {email}

                <div className={"Button"}>{
                    props.loggedIn ?
                        <SliderButton clickFunction={onModifyButtonClick} label={"Edit Profile"} />
                        : null
                }
                    <div className="popUpBox">
                        {
                            popupIsOpen ?
                                <EditPopup closePopup={() => togglePopup()} userName={props.email}>
                                </EditPopup>
                                : null
                        }
                    </div>
                    <div className="popUpBox">
                        {
                            confirmPopupIsOpen ?
                                < ConfirmPopup closePopup={() => toggleConfirmPopup()} acceptPopup={() => toggleAcceptPopup()}>
                                </ConfirmPopup>
                                : null
                        }
                    </div>
                </div>
            </div> : <div />)}
        </div>
    </div >
}

export default Home