import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import './App.css';
import { Root } from './components/Root/Root';
import Counter from './pages/Counter/Counter';
import Users from './pages/Users/Users';
import Login from './pages/Login/Login';
import Loginpage from './pages/Loginpage/Loginpage';
import { useState } from 'react';
import { useEffect } from 'react';
//import Connect from './pages/Connect/Connect';
//import AuthProvider from "./components/AuthProvider/AuthProvider";

function App() {
  
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState("")
  useEffect(() => {
    // Fetch the user email and token from local storage
    const user = JSON.parse(localStorage.getItem("user"))

    // If the token/email does not exist, mark the user as logged out
    if (!user || !user.token) {
      setLoggedIn(false)
      return
    }
    
    // If the token exists, verify it with the auth server to see if it is valid
    fetch("http://localhost:3080/verify", {
      method: "POST",
      headers: {
        'jwt-token': user.token
      }
    })
    .then(r => r.json())
    .then(r => {
      setLoggedIn('success' === r.message)
      setEmail(user.email || "")
    })
  }, [])
  
  return (
    < div className="app" >
        <Root>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<Loginpage email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
            {/* <Route path="connect" element={<Connect />} /> */}
            <Route path="counter" element={<Counter />} />
            <Route path="users" element={<Users />} />
            <Route path="about" element={<About />} />
            <Route path="home" element={<Home />} />
            <Route path="login" element={<Login setLoggedIn=
            {setLoggedIn} setEmail={setEmail} />} /> 
          </Routes>
        </Root >
  
    </div >
  );
};

export default App;
