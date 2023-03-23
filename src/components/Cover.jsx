import "../style/cover.css"
import Navbar from "./Navbar"
import { Link } from "react-router-dom"

export default function Cover(props) {

    function handleMainPage() {
        if (props.login == false) {
            window.alert("Please login first!")
            window.open("/login", "_self")
        }
    }

    return (
        <div className="cover">
            <Navbar login={props.login} setUser={props.setUser} user={props.user} />
            <div className="cover-text">EXPLORE THE DAILY IMAGE AND ITS DATA PROVIDED BY THE NASA</div>
            <Link to="/daily-image" className="cover-explore" onClick={handleMainPage}>Explore</Link>
        </div>
    )
}