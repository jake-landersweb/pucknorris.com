import CustomField from "./customField"
import EventTeam from "./eventTeam"

type Event = {
    eDescription: string
    eventId: string
    eTitle: string
    eLocation: string
    hasAttendance: boolean
    teamId: string
    seasonId: string
    homeTeam: EventTeam
    awayTeam: EventTeam
    eDate: string
    eLink: string
    inCount: number
    outCount: number
    undecidedCount: number
    noResponse: number
    showAttendance: boolean
    eventType: number
    customFields: CustomField[]
    customUserFields: CustomField[]
    eventColor: string
    allowAutoNotifications: boolean
    mvps: number
}

export default Event