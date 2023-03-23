import './App.css'
import Cover from './components/Cover';
import Main from "./components/Main";
import Register from "./components/Register";
import Login from "./components/Login";
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Navbar from './components/Navbar';
import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cookies from "universal-cookie"
import axios from "axios"

function App() {

  const cookie = new Cookies()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  const getUser = () => {
    axios.get(`${process.env.REACT_APP_SERVER}/auth/login/success`, { withCredentials: true }).then((response) => {
      setUser(response.data.user)
      console.log(user)
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    const token = cookie.get("jwt")
    if (token || Object.keys(user).length != 0) {
      setIsLoggedIn(true)
    }
    else {
      setIsLoggedIn(false)
    }
  })

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Cover login={isLoggedIn} setUser={setUser} user={user} />} />
          <Route path="/register" element={<Register login={isLoggedIn} setUser={setUser} user={user} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} login={isLoggedIn} setUser={setUser} user={user} />} />
          <Route path="/daily-image" element={<Main login={isLoggedIn} user={user} setUser={setUser} />} />
          <Route path="/forgot-password" element={<ForgotPassword login={isLoggedIn} setUser={setUser} user={user} />} />
          <Route path="/reset-password" element={<ResetPassword login={isLoggedIn} setUser={setUser} user={user} />} />
          <Route path="/abc" element={<Navbar login={isLoggedIn} user={user} setUser={setUser} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
