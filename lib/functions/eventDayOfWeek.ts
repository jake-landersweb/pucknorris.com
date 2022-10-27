import Event from "../data/event"
import eventDate from "./eventDate"

export default function eventDayOfWeek(event: Event) {
    const date = eventDate(event)
    switch (date.getDay()) {
        case 0: return "Sunday"
        case 1: return "Monday"
        case 2: return "Tuesday"
        case 3: return "Wednesday"
        case 4: return "Thursday"
        case 5: return "Friday"
        case 6: return "Saturday"
        default: return "Unknown"
    }
}