import Event from "../data/event"
import eventDate from "./eventDate"

export default function eventTime(event: Event) {
    const date = eventDate(event)

    var hours = date.getHours()
    var mins = date.getMinutes()
    var isAM = true
    if (hours > 12) {
        hours = hours - 12
        isAM = false
    }
    return `${hours}:${mins < 10 ? `0${mins}` : mins} ${isAM ? "AM" : "PM"}`
}