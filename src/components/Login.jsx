import "../style/login.css"
import Navbar from "./Navbar"
import { Link } from "react-router-dom"
import axios from "axios"
import Cookies from "universal-cookie"
const cookie = new Cookies()

export default function Login(props) {
    async function handleSubmit(e) {
        e.preventDefault()
        let payload = {
            email: e.target[0].value,
            password: e.target[1].value
        }
        axios.post(`${process.env.REACT_APP_SERVER}/user/login`, payload).then((response) => {
            if (response.data.status == "fault") {
                window.alert(response.data.message)
            }
            else {
                window.alert(response.data.message)
                props.setIsLoggedIn(true);
                cookie.set('jwt', response.data.token, { path: '/' });
                window.open("/daily-image", "_self")
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <div className="login">
            <Navbar login={props.login} setUser={props.setUser} user={props.user} />
            <div className="login-main">
                <div className="login-main-left"></div>
                <form className="login-main-right" onSubmit={handleSubmit}>
                    <div className="login-main-right-head">LOGIN</div>
                    <input type="email" placeholder="Enter Your Email" className="login-main-right-input1" />
                    <input type="password" placeholder="Enter Your Password" className="login-main-right-input2" />
                    <Link to="/forgot-password" className="login-main-right-forgot">Forgot Password?</Link>
                    <button className="login-main-right-submit">LOGIN</button>
                </form>
            </div>
        </div>
    )
}