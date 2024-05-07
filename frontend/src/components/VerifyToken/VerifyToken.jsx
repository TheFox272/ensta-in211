import { useState, useEffect } from 'react';

function useTokenVerification() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [uid, setUid] = useState("0");

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.token) {
            setLoggedIn(false);
            return;
        }

        fetch("http://localhost:8080/api/auth/verify", {
            method: "POST",
            headers: {
                'jwt-token': user.token
            }
        })
            .then(r => r.json())
            .then(r => {
                if ('success' === r.message) {
                    setLoggedIn(true);
                    setEmail(user.email);
                    setUid(user.userId);

                } else {
                    setLoggedIn(false);
                    setEmail("");
                    setUid("0");
                }
            })
            .catch(error => {
                console.error('Error verifying token:', error);
                setLoggedIn(false);
                setEmail("");
            });
    }, []);

    return { loggedIn, email, uid };
}

export default useTokenVerification;