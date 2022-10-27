import Event from "../data/event";

export default function eventIsHome(event: Event) {
    return event.homeTeam.teamId == process.env.NEXT_PUBLIC_TEAMID
}