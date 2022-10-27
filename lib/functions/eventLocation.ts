import Event from "../data/event";

export default function eventLocation(event: Event) {
    if (event.eLocation?.name == undefined) {
        if (event.eLocation?.address == undefined) {
            return ""
        } else if (event.eLocation.address != "") {
            return event.eLocation.address
        } else {
            return ""
        }
    } else if (event.eLocation.name != "") {
        return event.eLocation.name
    } else {
        return ""
    }
}