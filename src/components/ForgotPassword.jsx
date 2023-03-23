import "../style/login.css"
import Navbar from "./Navbar"
import { Link } from "react-router-dom"
import axios from "axios"

export default function ForgotPassword(props) {
    async function handleSubmit(e) {
        e.preventDefault()
        let payload = {
            email: e.target[0].value
        }
        axios.post(`${process.env.REACT_APP_SERVER}/user/forgot-password`, payload).then((response) => {
            window.alert("Reset Password link has been sent to this mail !")
            window.open("/", "_self")
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
                    <div className="login-main-right-head">Forgot Password</div>
                    <input type="email" placeholder="Enter Your Email" className="login-main-right-input3" />
                    <button className="login-main-right-submit">SUBMIT</button>
                </form>
            </div>
        </div>
    )
}