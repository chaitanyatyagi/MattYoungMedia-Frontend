import "../style/login.css"
import Navbar from "./Navbar"
import { Link } from "react-router-dom"
import axios from "axios"

export default function ResetPassword(props) {

    let params = (new URL(document.location)).searchParams;
    let name = params.get("token")

    function handleSubmit(e) {
        e.preventDefault()
        let payload = {
            password: e.target[0].value
        }
        axios.post(`${process.env.REACT_APP_SERVER}/user/reset-password/${name}`, payload).then((response) => {
            if (response.data.status == "fault") {
                window.alert(response.data.message)
            }
            else {
                window.alert(response.data.message)
                window.open("/", "_self")
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
                    <div className="login-main-right-head">RESET PASSWORD</div>
                    <input type="password" placeholder="Enter Your New Password" className="login-main-right-input3" />
                    <button className="login-main-right-submit">SUBMIT</button>
                </form>
            </div>
        </div>
    )
}