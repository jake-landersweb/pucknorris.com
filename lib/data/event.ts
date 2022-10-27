import CustomField from "./customField"
import ELocObj from "./eLocObj"
import EventTeam from "./eventTeam"

// class Event {
//     eDescription: string
//     eventId: string
//     eTitle: string
//     eLocation: string
//     hasAttendance: boolean
//     teamId: string
//     seasonId: string
//     homeTeam: EventTeam
//     awayTeam: EventTeam
//     eDate: string
//     eLink: string
//     inCount: number
//     outCount: number
//     undecidedCount: number
//     noResponse: number
//     showAttendance: boolean
//     eventType: number
//     eventColor: string
//     allowAutoNotifications: boolean
//     mvps: number

//     constructor(
//         eDescription: string,
//         eventId: string,
//         eTitle: string,
//         eLocation: string,
//         hasAttendance: boolean,
//         teamId: string,
//         seasonId: string,
//         homeTeam: EventTeam,
//         awayTeam: EventTeam,
//         eDate: string,
//         eLink: string,
//         inCount: number,
//         outCount: number,
//         undecidedCount: number,
//         noResponse: number,
//         showAttendance: boolean,
//         eventType: number,
//         eventColor: string,
//         allowAutoNotifications: boolean,
//         mvps: number,
//     ) {
//         this.eDescription = eDescription;
//         this.eventId = eventId;
//         this.eTitle = eTitle;
//         this.eLocation = eLocation;
//         this.hasAttendance = hasAttendance;
//         this.teamId = teamId;
//         this.seasonId = seasonId;
//         this.homeTeam = homeTeam;
//         this.awayTeam = awayTeam;
//         this.eDate = eDate;
//         this.eLink = eLink;
//         this.inCount = inCount;
//         this.outCount = outCount;
//         this.undecidedCount = undecidedCount;
//         this.noResponse = noResponse;
//         this.showAttendance = showAttendance;
//         this.eventType = eventType;
//         this.eventColor = eventColor;
//         this.allowAutoNotifications = allowAutoNotifications;
//         this.mvps = mvps;
//     }

//     getDate() {
//         return new Date(Date.parse(this.eDate.replace(/-/g, "/").replace(/T/g, " ")))
//     }

//     getTime() {
//         const date = this.getDate()
//         var hours = date.getHours()
//         var mins = date.getMinutes()
//         var isAM = true
//         if (hours > 12) {
//             hours = hours - 12
//             isAM = false
//         }
//         return `${hours}:${mins < 10 ? `0${mins}` : mins} ${isAM ? "AM" : "PM"}`
//     }

//     getEventDayNumber() {
//         const date = this.getDate()
//         return date.getDate()
//     }

//     getEventMonthName() {
//         const date = this.getDate()
//         switch (date.getMonth()) {
//             case 0: return "January"
//             case 1: return "Feburary"
//             case 2: return "March"
//             case 3: return "April"
//             case 4: return "May"
//             case 5: return "June"
//             case 6: return "July"
//             case 7: return "August"
//             case 8: return "September"
//             case 9: return "October"
//             case 10: return "November"
//             case 11: return "December"
//             default: return "Unknown"
//         }
//     }

//     getDayOfWeek() {
//         const date = this.getDate()
//         switch (date.getDay()) {
//             case 0: return "Sunday"
//             case 1: return "Monday"
//             case 2: return "Tuesday"
//             case 3: return "Wednesday"
//             case 4: return "Thursday"
//             case 5: return "Friday"
//             case 6: return "Saturday"
//             default: return "Unknown"
//         }
//     }

//     isHome() {
//         return this.homeTeam.teamId == process.env.NEXT_PUBLIC_TEAMID
//     }

//     isPrevious() {
//         const date = this.getDate()
//         const currentDate = new Date()
//         return currentDate > date
//     }
// }

// export default Event

type Event = {
    eDescription: string
    eventId: string
    eTitle: string
    eLocation: ELocObj
    hasAttendance: boolean
    teamId: string
    seasonId: string
    homeTeam: EventTeam
    awayTeam: EventTeam
    eDate: string
    eLink: string
    inCount: number
    outCount: number
    customFields: CustomField[]
    customUserFields: CustomField[]
    undecidedCount: number
    noResponse: number
    showAttendance: boolean
    eventType: number
    eventColor: string
    allowAutoNotifications: boolean
    mvps: number
}

export default Event