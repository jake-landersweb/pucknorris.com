import Event from "../data/event"
import eventDate from "./eventDate"

export default function eventIsPrevious(event: Event) {
    const date = eventDate(event)
    const currentDate = new Date()
    return currentDate > date
}