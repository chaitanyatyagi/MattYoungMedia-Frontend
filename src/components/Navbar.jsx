import "../style/navbar.css"
import { Link } from "react-router-dom"
import Cookies from "universal-cookie"
const cookies = new Cookies()

export default function Navbar(props) {

    function destroyCookie() {
        if (Object.keys(props.user).length == 0) {
            cookies.remove('jwt', { path: '/' })
            window.location.reload()
        }
        else {
            props.setUser({})
            window.open(`${process.env.REACT_APP_SERVER}/auth/logout`, "_self")
        }
    }
    return (
        <div className="navbar">
            <Link to="/" className="navbar-logo"></Link>
            {
                props.login ? <Link to="/" className="navbar-register" onClick={destroyCookie}>LOGOUT</Link> : <Link to="/register" className="navbar-register">REGISTER</Link>
            }
        </div>
    )
}