//import PopupLogin from '../../components/PopupLogin/PopupLogin';
/*
import React, { useState, useEffect } from 'react';
import './Connect.css';

function Connect() {

    const [firstTimeVisit, setFirstTimeVisit] = useState(true);
    useEffect(() => {
        const isFirstTimeVisit = localStorage.getItem('firstTimeVisit')
        if (!isFirstTimeVisit) {
            setFirstTimeVisit(false);
            localStorage.setItem('firstTimeVisit', 'visited');
        }
    }, []);

    const handlePopupClose = () => {
        setFirstTimeVisit(false);
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);

    // Fonction pour gérer la connexion
    const handleLogin = () => {
        // Mettre en œuvre la logique de connexion ici
        setIsLoggedIn(true);
        onClose();
    };
    const handleCreateAccount = () => {
        // Mettre en œuvre la logique de création de compte ici
        setIsCreatingAccount(true);
        onClose();
    };

    // Fonction pour gérer la navigation en tant qu'utilisateur anonyme
    const handleContinueAsGuest = () => {
        // Mettre en œuvre la logique de navigation en tant qu'utilisateur anonyme ici
        onClose();
    };
    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Bienvenue!</h2>
                <p>Choisissez une option :</p>
                <button onClick={handleLogin}>Se connecter</button>
                <button onClick={handleCreateAccount}>Créer un compte</button>
                <button onClick={handleContinueAsGuest}>Continuer en tant qu'utilisateur anonyme</button>
            </div>
            {firstTimeVisit && <PopupLogin onClose={handlePopupClose} />}
        </div >
    );
}

export default Connect;   
*/