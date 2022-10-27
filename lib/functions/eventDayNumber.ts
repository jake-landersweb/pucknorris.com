import Event from "../data/event"
import eventDate from "./eventDate"

export default function eventDayNumber(event: Event) {
    const date = eventDate(event)
    return date.getDate()
}