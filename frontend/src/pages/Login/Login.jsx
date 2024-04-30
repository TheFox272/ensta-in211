import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SliderButton } from '../../components/sliderButton/SliderButton';
import './Login.css';
import user from './user.png';
import lock from './lock.png';

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const navigate = useNavigate();

    const onButtonClick = () => {

        // Set initial error values to empty
        setEmailError("")
        setPasswordError("")

        // Check if the user has entered both fields correctly
        if ("" === email) {
            setEmailError("Please enter your email")
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email")
            return
        }

        if ("" === password) {
            setPasswordError("Please enter a password")
            return
        }

        if (password.length < 7) {
            setPasswordError("The password must be 8 characters or longer")
            return
        }

        // Check if email has an account associated with it
        checkAccountExists(accountExists => {
            // If yes, log in 
            //la fonction de callback est appelée après que la requête ait été effectuée, cette fonction est
            //définit ici, accountExists est le paramètre de cette fonction (c'est un booléen et il vaut r.userExists)
            if (accountExists)
                logIn()
            else
                // Else, ask user if they want to create a new account and if yes, then log in
                if (window.confirm("An account does not exist with this email address: " + email + ". Do you want to create a new account?")) {
                    logIn()
                }
        })
    }

    // Call the server API to check if the given email ID already exists
    const checkAccountExists = (callback) => {
        fetch("http://localhost:3080/check-account", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        })
            .then(r => r.json())
            .then(r => {
                callback(r?.userExists)
            })
    }

    // Log in a user using email and password
    const logIn = () => {
        fetch("http://localhost:3080/auth", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(r => r.json())
            .then(r => {
                if ('success' === r.message) {
                    localStorage.setItem("user", JSON.stringify({ email, token: r.token }))
                    props.setLoggedIn(true)
                    props.setEmail(email)
                    navigate("/")
                } else {
                    window.alert("Wrong email or password")
                }
            })
    }

    return <div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <h1>Login</h1>
        </div>
        <br />
        <div className="wrapper">
            <img src={user} alt="User" className="icon" />
            <input
                value={email}
                placeholder="Enter your email here"
                onChange={ev => setEmail(ev.target.value)}
                className={"inputContainer"} />
        </div>
        <br />
        <label className="errorLabel">{emailError}</label>
        <br />
        <div className="wrapper">
            <img src={lock} alt="Lock" className="icon" />
            <input
                value={password}
                placeholder="Enter your password here"
                onChange={ev => setPassword(ev.target.value)}
                className={"inputContainer"} />
        </div>
        <br />
        <label className="errorLabel">{passwordError}</label>

        <br />
        <div className={"buttonContainer"}>
            <SliderButton clickFunction={onButtonClick} label={"Log in"} />
        </div>
    </div >

}

export default Login