import "../style/login.css"
import Navbar from "./Navbar"
import { Link } from "react-router-dom"
import axios from "axios"

export default function Register(props) {
    async function handleSubmit(e) {
        e.preventDefault()
        let payload = {
            name: e.target[0].value,
            email: e.target[1].value,
            password: e.target[2].value
        }
        axios.post("http://localhost:1808/user/register", payload).then((response) => {
            if (response.data.status == "fault") {
                window.alert(response.data.message)
            }
            else {
                window.alert(response.data.message)
                window.open("/login", "_self")
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    const authFunction = () => {
        window.open(`${process.env.REACT_APP_SERVER}/auth/google`, "_self")
    }
    return (
        <div className="login">
            <Navbar login={props.login} setUser={props.setUser} user={props.user} />
            <div className="login-main">
                <div className="login-main-left"></div>
                <form className="login-main-right" onSubmit={handleSubmit}>
                    <div className="login-main-right-head">REGISTER</div>
                    <input type="text" placeholder="Enter Your Name" className="login-main-right-input0" />
                    <input type="email" placeholder="Enter Your Email" className="login-main-right-input1" />
                    <input type="password" placeholder="Enter Your Password" className="login-main-right-input2" />
                    <Link to="/login" className="login-main-right-forgot">Already Registered? Login</Link>
                    <button type="button" class="login-with-google-btn" onClick={authFunction}>
                        Sign in with Google
                    </button>
                    {/* <GoogleLogin clientId="128499853975-ns1ivu3v42jcs2gutlrp7vj9grchlov2.apps.googleusercontent.com" buttonText="Sign In With Google" onSuccess={onSuccess} onFailure={onFailure} cookiePolicy={'single_host_origin'} isSignedIn={true} /> */}
                    <button className="login-main-right-submit">REGISTER</button>
                </form>
            </div>
        </div>
    )
}