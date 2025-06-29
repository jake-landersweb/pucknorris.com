import Event from "../lib/data/event";
import eventDayNumber from "../lib/functions/eventDayNumber";
import eventDayOfWeek from "../lib/functions/eventDayOfWeek";
import eventIsPrevious from "../lib/functions/eventIsPrevious";
import eventLocation from "../lib/functions/eventLocation";
import eventMonthName from "../lib/functions/eventMonthName";
import eventTime from "../lib/functions/eventTime";
import { MdOutlineSportsScore } from 'react-icons/md'
import eventIsHome from "../lib/functions/eventIsHome";

const EventCell = ({ event }: { event: Event }) => {
    const largeTitle = () => {
        if (event.eventType == 1) {
            return <div className="text-[44px] md:text-6xl font-light grid grid-cols-1 place-items-center">
                <h4 className={`${eventIsHome(event) ? "font-bold" : "text-txt-400"} text-center`}>{event.homeTeam.title}</h4>
                <p className='text-2xl font-light text-txt-500 mx-auto'>vs</p>
                <h4 className={`${eventIsHome(event) ? "text-txt-400" : "font-bold"} text-center`}>{event.awayTeam.title}</h4>
                {/* {eventIsPrevious(event) ? getScore() : <></>} */}
            </div>
        } else {
            return <h4 className="text-6xl grid grid-cols-1 place-items-center font-medium">{event.eTitle}</h4>
        }
    }

    const detailCell = (label: string, val: string) => {
        return <div key={label} className="pt-4 space-y-2">
            <p className="text-txt-300 text-xl font-bold">{label.toUpperCase()}</p>
            <p className="text-gray-500 text-lg break-words">{val}</p>
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
        return <div className="flex items-center pt-4 text-2xl">
            <div className="pr-4"><MdOutlineSportsScore className="text-main min-w-[30px] min-h-[30px]" /></div>
            <div className="pr-4">
                <span className={`${event.homeTeam.teamId == process.env.NEXT_PUBLIC_TEAMID ? "font-bold" : "text-txt-300"}`}>{event.homeTeam.score ?? 0}</span>
                <span className='text-txt-300'> - </span>
                <span className={`${event.homeTeam.teamId != process.env.NEXT_PUBLIC_TEAMID ? "font-bold" : "text-txt-300"}`}>{event.awayTeam.score ?? 0}</span>
            </div>

            <p className={` text-2xl tracking-wide ${(event.homeTeam.score ?? 0) > (event.awayTeam.score ?? 0) ? eventIsHome(event) ? "text-green-300" : "text-red-500" : eventIsHome(event) ? "text-red-500" : "text-green-300"}`}>{(event.homeTeam.score ?? 0) > (event.awayTeam.score ?? 0) ? eventIsHome(event) ? "WIN" : "LOSS" : (event.homeTeam.score ?? 0) == (event.awayTeam.score ?? 0) ? "" : eventIsHome(event) ? "LOSS" : "WIN"}</p>

        </div>
    }

    return <div className="flex items-start max-w-[1000px] text-center w-full h-full">
        <div className="p-4 bg-bg-700 rounded-lg w-full h-full">
            <div className="flex items-center">
                <div className="grid content-center justify-center place-items-center">
                    <p className="text-6xl font-bold">{eventDayNumber(event)}</p>
                    <p className="text-main text-2xl">{eventMonthName(event).substring(0, 3)}</p>
                </div>
                <div className="mx-auto grid place-items-center">
                    <p className='text-4xl md:text-[44px] font-light'>{eventDayOfWeek(event).toUpperCase()}</p>
                    <p className='text-xl font-bold text-txt-300 text-center'>@ {eventTime(event)}</p>
                </div>
            </div>
            <div className="py-8">
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