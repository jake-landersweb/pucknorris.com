import { MdOutlineSportsScore } from "react-icons/md"
import Event from "../lib/data/event"
import eventDayNumber from "../lib/functions/eventDayNumber"
import eventIsHome from "../lib/functions/eventIsHome"
import eventIsPrevious from "../lib/functions/eventIsPrevious"
import eventMonthName from "../lib/functions/eventMonthName"

const EventCellCompact = ({ event }: { event: Event }) => {
    const title = () => {
        if (event.eventType == 1) {
            return <div className="text-xl md:text-3xl font-light flex space-x-4 items-center">
                <h4 className={`${eventIsHome(event) ? "font-bold" : "text-txt-400"} break-words text-center`}>{event.homeTeam.title}</h4>
                <p className='text-2xl font-light text-txt-500 mx-auto'>vs</p>
                <h4 className={`${eventIsHome(event) ? "text-txt-400" : "font-bold"} break-words text-center`}>{event.awayTeam.title}</h4>
                {/* {eventIsPrevious(event) ? getScore() : <></>} */}
            </div>
        } else {
            return <h4 className="text-2xl md:text-4xl font-medium">{event.eTitle}</h4>
        }
    }

    const score = () => {
        return <div className="flex items-center pt-4 text-2xl">
            <div className="pr-4"><MdOutlineSportsScore className="text-main min-w-[30px] min-h-[30px]" /></div>
            <div className="pr-4">
                <span className={`${event.homeTeam.teamId == process.env.NEXT_PUBLIC_TEAMID ? "font-bold" : "text-txt-300"}`}>{event.homeTeam.score ?? 0}</span>
                <span className='text-txt-300'> - </span>
                <span className={`${event.homeTeam.teamId != process.env.NEXT_PUBLIC_TEAMID ? "font-bold" : "text-txt-300"}`}>{event.awayTeam.score ?? 0}</span>
            </div>
            <p className={` text-2xl tracking-wide ${(event.homeTeam.score ?? 0) > (event.awayTeam.score ?? 0) ? !eventIsPrevious(event) ? "text-green-300" : "text-red-500" : !eventIsPrevious(event) ? "text-red-500" : "text-green-300"}`}>{(event.homeTeam.score ?? 0) > (event.awayTeam.score ?? 0) ? !eventIsPrevious(event) ? "WIN" : "LOSS" : (event.homeTeam.score ?? 0) == (event.awayTeam.score ?? 0) ? "" : !eventIsPrevious(event) ? "LOSS" : "WIN"}</p>
        </div>
    }

    return <div className="flex space-x-4 items-center px-4 py-2 flex-grow">
        <div className="grid content-center justify-center place-items-center">
            <p className="text-3xl md:text-4xl font-bold">{eventDayNumber(event)}</p>
            <p className="text-main text-xl md:text-2xl">{eventMonthName(event).substring(0, 3)}</p>
        </div>
        <div className="flex flex-row w-full">
            <div className="space-y-2 mx-auto">
                {eventIsPrevious(event) ? <div className="grid place-items-center">{score()}</div> : null}
                {title()}
            </div>
        </div>
    </div>
}

export default EventCellCompact