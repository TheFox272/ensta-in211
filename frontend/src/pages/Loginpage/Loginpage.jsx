import React from "react"
import { useNavigate } from "react-router-dom";
import { SliderButton } from '../../components/sliderButton/SliderButton';
import './Loginpage.css';

const Home = (props) => {
    const { loggedIn, email } = props
    const navigate = useNavigate();

    const onButtonClick = () => {
        if (loggedIn) {
            localStorage.removeItem("user")
            props.setLoggedIn(false)
        } else {
            navigate("/login")
        }
    }


    return <div className="mainContainer">
        <div className={"titleContainer"}>
            <h1>Welcome!</h1>
        </div>

        <div className={"buttonContainer"}>
            <SliderButton clickFunction={onButtonClick} label={loggedIn ? "Log out" : "Log in"} />
            {(loggedIn ? <div>
                Your email address is {email}
            </div> : <div />)}
        </div>
    </div>
}

export default Home