import Event from "../data/event";

export default function eventDate(event: Event) {
    return new Date(Date.parse(event.eDate.replace(/-/g, "/").replace(/T/g, " ")))
}