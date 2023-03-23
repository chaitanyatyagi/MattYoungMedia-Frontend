import { useState, useEffect } from "react"
import "../style/main.css"

export default function Timer() {
    const [day, setDate] = useState(0)
    const [hour, setHour] = useState(0)
    const [minute, setMinute] = useState(0)
    const [second, setSecond] = useState(0)

    let interval
    const startTimer = () => {
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 1, 0)

        const deadlineTime = new Date(tomorrow).getTime()
        interval = setInterval(() => {
            const currentTime = new Date().getTime()
            const distance = deadlineTime - currentTime
            const days = Math.floor(distance / (24 * 60 * 60 * 1000))
            const hours = Math.floor((distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60))
            const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60))
            const seconds = Math.floor((distance % (60 * 1000)) / 60)

            if (distance < 0) {
                clearInterval(interval.current)
            }
            else {
                setDate(days)
                setHour(hours)
                setMinute(minutes)
                setSecond(seconds)
            }
        })
    }
    useEffect(() => {
        startTimer()
    })
    return (
        <div className="timer">{day}  :  {hour}  :  {minute}  :  {second}</div>
    )
}