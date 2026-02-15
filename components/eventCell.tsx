import Event from "../lib/data/event";
import eventDayNumber from "../lib/functions/eventDayNumber";
import eventDayOfWeek from "../lib/functions/eventDayOfWeek";
import eventIsPrevious from "../lib/functions/eventIsPrevious";
import eventLocation from "../lib/functions/eventLocation";
import eventMonthName from "../lib/functions/eventMonthName";
import eventTime from "../lib/functions/eventTime";
import { MdOutlineSportsScore } from 'react-icons/md'
import eventIsHome from "../lib/functions/eventIsHome";

const EventCell = ({ event, compact = false }: { event: Event, compact?: boolean }) => {
    const largeTitle = () => {
        if (event.eventType == 1) {
            return <div className="text-lg md:text-xl font-light grid grid-cols-1 place-items-center">
                <h4 className={`${eventIsHome(event) ? "font-semibold" : "text-txt-400"} text-center`}>{event.homeTeam.title}</h4>
                <p className='text-sm font-light text-txt-500 mx-auto'>vs</p>
                <h4 className={`${eventIsHome(event) ? "text-txt-400" : "font-semibold"} text-center`}>{event.awayTeam.title}</h4>
                {/* {eventIsPrevious(event) ? getScore() : <></>} */}
            </div>
        } else {
            return <h4 className="text-xl grid grid-cols-1 place-items-center font-medium">{event.eTitle}</h4>
        }
    }

    const detailCell = (label: string, val: string) => {
        return <div key={label} className="pt-2 space-y-1">
            <p className="text-txt-300 text-xs font-bold">{label.toUpperCase()}</p>
            <p className="text-gray-500 text-sm break-words">{val}</p>
        </div>
    }

    const customFields = () => {
        const items = []
        for (var i = 0; i < event.customFields.length; i++) {
            if (event.customFields[i].value != "") {
                items.push(detailCell(event.customFields[i].title, event.customFields[i].value))
            }
        }
        return items
    }

    const score = () => {
        return <div className="flex items-center pt-2 text-base">
            <div className="pr-2"><MdOutlineSportsScore className="text-main min-w-[20px] min-h-[20px]" /></div>
            <div className="pr-2">
                <span className={`${event.homeTeam.teamId == process.env.NEXT_PUBLIC_TEAMID ? "font-bold" : "text-txt-300"}`}>{event.homeTeam.score ?? 0}</span>
                <span className='text-txt-300'> - </span>
                <span className={`${event.homeTeam.teamId != process.env.NEXT_PUBLIC_TEAMID ? "font-bold" : "text-txt-300"}`}>{event.awayTeam.score ?? 0}</span>
            </div>

            <p className={`text-base tracking-wide ${(event.homeTeam.score ?? 0) > (event.awayTeam.score ?? 0) ? eventIsHome(event) ? "text-green-300" : "text-red-500" : eventIsHome(event) ? "text-red-500" : "text-green-300"}`}>{(event.homeTeam.score ?? 0) > (event.awayTeam.score ?? 0) ? eventIsHome(event) ? "WIN" : "LOSS" : (event.homeTeam.score ?? 0) == (event.awayTeam.score ?? 0) ? "" : eventIsHome(event) ? "LOSS" : "WIN"}</p>

        </div>
    }

    // Compact view for previous games
    if (compact) {
        const compactScore = () => {
            const homeScore = event.homeTeam.score ?? 0
            const awayScore = event.awayTeam.score ?? 0
            const isWin = eventIsHome(event) ? homeScore > awayScore : awayScore > homeScore
            const isTie = homeScore === awayScore

            return <div className="flex items-center gap-2">
                <span className="font-bold text-base">{homeScore} - {awayScore}</span>
                {!isTie && <span className={`text-sm font-bold ${isWin ? "text-green-400" : "text-red-400"}`}>{isWin ? "W" : "L"}</span>}
            </div>
        }

        return <div className="bg-bg-700 rounded-md px-3 py-2 w-full max-w-[300px]">
            <div className="flex items-center justify-between gap-3">
                <div className="text-xs text-gray-400">
                    {eventMonthName(event).substring(0, 3)} {eventDayNumber(event)}
                </div>
                {compactScore()}
            </div>
            <div className="flex items-center justify-center gap-2 mt-1 text-sm">
                <span className={eventIsHome(event) ? "font-bold" : "text-gray-400"}>{event.homeTeam.title}</span>
                <span className="text-gray-500">vs</span>
                <span className={!eventIsHome(event) ? "font-bold" : "text-gray-400"}>{event.awayTeam.title}</span>
            </div>
            {event.eDescription && event.eDescription !== "" && (
                <p className="text-xs text-gray-500 mt-1 text-center">{event.eDescription.length > 100 ? event.eDescription.substring(0, 100) + "..." : event.eDescription}</p>
            )}
        </div>
    }

    return <div className="flex items-start max-w-[400px] text-center w-full h-full">
        <div className="p-3 bg-bg-700 rounded-lg w-full h-full">
            <div className="flex items-center">
                <div className="grid content-center justify-center place-items-center">
                    <p className="text-2xl md:text-3xl font-bold">{eventDayNumber(event)}</p>
                    <p className="text-main text-sm">{eventMonthName(event).substring(0, 3)}</p>
                </div>
                <div className="mx-auto grid place-items-center">
                    <p className='text-xl md:text-2xl font-light'>{eventDayOfWeek(event).toUpperCase()}</p>
                    <p className='text-sm font-bold text-txt-300 text-center'>@ {eventTime(event)}</p>
                </div>
            </div>
            <div className="py-4">
                {largeTitle()}
                {eventIsPrevious(event) ? <div className="grid place-items-center">{score()}</div> : null}
            </div>
            {event.eDescription == "" ? null : <>{detailCell("Description", event.eDescription.length > 200 ? event.eDescription.substring(0, 200) + "..." : event.eDescription)}</>}
            {eventLocation(event) == "" ? null : <>{detailCell("Location", eventLocation(event))}</>}
            {customFields()}
        </div>
    </div>
}

export default EventCell