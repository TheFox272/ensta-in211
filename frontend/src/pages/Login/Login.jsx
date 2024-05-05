import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SliderButton } from '../../components/sliderButton/SliderButton';
import './Login.css';

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")


    const navigate = useNavigate();
    function togglePopup() {
        setPopupIsOpen(!popupIsOpen)
    }
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
        console.log(`${import.meta.env.VITE_BACKDEND_URL}/auth`)
        fetch("http://localhost:8080/api/auth/check-account", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
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
        fetch("http://localhost:8080/auth/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
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
        /*
        axios
        .post(`${import.meta.env.VITE_BACKDEND_URL}/users/new`, )//formValues)
        .then(() => {
          displayCreationSuccessMessage();
          setFormValues(DEFAULT_FORM_VALUES);
        })
        .catch((error) => {
          setUserCreationError('An error occured while creating new user.');
          console.error(error);
        });
        */
    }

    return <div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <div>Login</div>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={email}
                placeholder="Enter your email here"
                onChange={ev => setEmail(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={password}
                placeholder="Enter your password here"
                onChange={ev => setPassword(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={"Button"}>
            <SliderButton clickFunction={onButtonClick} label={"Log in"} />
        </div>
    </div>

}

export default Login