import "../style/main.css"
import Navbar from "./Navbar"
import Timer from "./Timer"
import { useState, useEffect } from "react"
import axios from "axios"

export default function Main(props) {

    const [data, setData] = useState("")
    const [head, setHead] = useState("")
    const [image, setImage] = useState("")
    const [mediaType, setMediaType] = useState("")

    useEffect(() => {
        axios.get("https://api.nasa.gov/planetary/apod?api_key=NSaOZABJTnQguj6ZeyS8doPy9jCD0cwGQPtZhP9y").then((response) => {
            setData(response.data.explanation)
            setHead(response.data.title)
            setImage(response.data.url)
            setMediaType(response.data.media_type)

        }).catch((error) => {
            console.log(error)
        })
    })

    if (props.login) {
        return (
            <div className="main">
                <Navbar login={props.login} setUser={props.setUser} user={props.user} />
                <div className="main-timer">
                    <div className="main-timer-head">NEW IMAGE WILL DISPLAY AFTER:</div>
                    {/* <div className="main-timer-clock"></div> */}
                    <Timer />
                </div>
                <div className="main-image">
                    {
                        mediaType == "video" ?
                            <iframe
                                width="853"
                                height="480"
                                src={image}
                                frameBorder="0"
                                className="main-image-left"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Embedded youtube"
                            />
                            : <div className="main-image-left" style={{ backgroundImage: `url(${image})` }}></div>
                    }
                    <div className="main-image-right">
                        <div className="main-image-right-head">{head}</div>
                        <div className="main-image-right-data">{data}</div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <h1>Please Login First!</h1>
        )
    }
}