import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import './App.css';
import { Root } from './components/Root/Root';
import Playlists from './pages/Playlists/Playlists';
import Users from './pages/Users/Users';
import Login from './pages/Login/Login';
import Loginpage from './pages/Loginpage/Loginpage';
import AddMovie from './components/AddMovie/AddMovie';
import { useState } from 'react';
import { useEffect } from 'react';


//import Connect from './pages/Connect/Connect';
//import AuthProvider from "./components/AuthProvider/AuthProvider";

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState("")
  const [userId, setUserId] = useState("0")

  useEffect(() => {
    // Fetch the user email and token from local storage
    const user = JSON.parse(localStorage.getItem("user"))

    // If the token/email does not exist, mark the user as logged out
    if (!user || !user.token) {
      setLoggedIn(false)
      return
    }
    console.log("user token", user.token)
    // If the token exists, verify it with the auth server to see if it is valid
    fetch("http://localhost:8080/api/auth/verify", {
      method: "POST",
      headers: {
        'jwt-token': user.token
      }
    })
      .then(r => r.json())
      .then(r => {
        if ('success' === r.message) {
          setLoggedIn(true)
          setEmail(user.email)
          console.log("user email", user.email)
        }
        else {
          setLoggedIn(false)
          setUserId("0")
          console.log(userId)
        }
        //setLoggedIn('success' === r.message)
        //setEmail(user.email || "")
      })
  }, [])

  return (
    < div className="app" >
      <Root>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Loginpage email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUid={setUserId} />} />
          {/* <Route path="connect" element={<Connect />} /> */}
          <Route path="playlists" element={<Playlists userId={userId} />} />
          <Route path="add-movie/:playlistname" element={<AddMovie userId={userId} />} />
          <Route path="users" element={<Users />} />
          <Route path="about" element={<About />} />
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login setLoggedIn=
            {setLoggedIn} setEmail={setEmail} setUserId={setUserId} />} />
        </Routes>
      </Root >
    </div >
  );
};

export default App;
