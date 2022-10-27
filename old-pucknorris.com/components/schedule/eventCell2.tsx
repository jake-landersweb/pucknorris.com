import Event from '../../data/event'
import { IoCalendarNumberOutline, IoHomeOutline, IoDocumentTextOutline, IoLocationOutline, IoSettingsOutline } from 'react-icons/io5'
import { MdSportsScore } from 'react-icons/md'
import { IoMdTime } from 'react-icons/io'

const EventCell2 = ({ event, isPrevious, headerText, className }: { event: Event, isPrevious: boolean, headerText?: string, className?: string }) => {
    const getDate = () => {
        return new Date(Date.parse(event.eDate.replace(/-/g, "/").replace(/T/g, " ")))
    }

    const getTime = () => {
        const date = getDate()
        var hours = date.getHours()
        var mins = date.getMinutes()
        var isAM = true
        if (hours > 12) {
            hours = hours - 12
            isAM = false
        }
        return `${hours}:${mins < 10 ? `0${mins}` : mins} ${isAM ? "AM" : "PM"}`
    }

    const getEventDayNumber = () => {
        const date = getDate()
        return date.getDate()
    }

    const getEventMonthName = () => {
        const date = getDate()
        switch (date.getMonth()) {
            case 0: return "January"
            case 1: return "Feburary"
            case 2: return "March"
            case 3: return "April"
            case 4: return "May"
            case 5: return "June"
            case 6: return "July"
            case 7: return "August"
            case 8: return "September"
            case 9: return "October"
            case 10: return "November"
            case 11: return "December"
            default: return "Unknown"
        }
    }

    const getDayOfWeek = () => {
        const date = getDate()
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

    const isHome = () => {
        return event.homeTeam.teamId == process.env.NEXT_PUBLIC_TEAMID
    }

    const isEmpty = (val: string) => {
        if (val == undefined) {
            return true
        } else if (val == "") {
            return true
        } else {
            return false
        }
    }

    const getTitle = () => {
        if (event.eventType == 1) {
            return <div className="text-[44px] md:text-6xl font-light grid grid-cols-1 place-items-center">
                <h4 className={`${isHome() ? "font-bold" : "text-txt-400"} text-center`}>{event.homeTeam.title}</h4>
                <p className='text-2xl font-light text-txt-500 mx-auto'>vs</p>
                <h4 className={`${isHome() ? "text-txt-400" : "font-bold"} text-center`}>{event.awayTeam.title}</h4>
                {isPrevious ? getScore() : <></>}
            </div>
        } else {
            return <h4 className="text-6xl grid grid-cols-1 place-items-center font-medium">{event.eTitle}</h4>
        }
    }

    const getScore = () => {
        return <div className="flex items-center pt-4 text-2xl">
            <div className="pr-4"><MdSportsScore className={iconClass} /></div>
            <div className="pr-4">
                <span className={`${event.homeTeam.teamId == process.env.NEXT_PUBLIC_TEAMID ? "font-bold" : "text-txt-300"}`}>{event.homeTeam.score ?? 0}</span>
                <span className='text-txt-300'> - </span>
                <span className={`${event.homeTeam.teamId != process.env.NEXT_PUBLIC_TEAMID ? "font-bold" : "text-txt-300"}`}>{event.awayTeam.score ?? 0}</span>
            </div>
            <p className={`font-gains text-2xl tracking-wide ${(event.homeTeam.score ?? 0) > (event.awayTeam.score ?? 0) ? isHome() ? "text-green-300" : "text-red-500" : isHome() ? "text-red-500" : "text-green-300"}`}>{(event.homeTeam.score ?? 0) > (event.awayTeam.score ?? 0) ? isHome() ? "WIN" : "LOSS" : (event.homeTeam.score ?? 0) == (event.awayTeam.score ?? 0) ? "" : isHome() ? "LOSS" : "WIN"}</p>
        </div>
    }

    const getCustomFields = () => {
        const items = []
        for (var i = 0; i < event.customFields.length; i++) {
            // not using rn
            if (!isEmpty(event.customFields[i].value)) {
                items.push(
                    <EventDetailRow title={event.customFields[i].title} content={event.customFields[i].value} icon={<IoSettingsOutline className={iconClass} />} />
                )
            }
        }
        return items
    }

    const iconClass = "text-main min-w-[30px] min-h-[30px]"


    return <div className={`bg-bg-700 border border-bg-500 rounded-lg p-2 w-full h-full ${className ?? ""}`}>
        {headerText == undefined ? <></> : <p className='text-xl text-txt-200 underline'>{headerText}</p>}
        <div className="p-4 flex items-center">
            <div className="grid place-items-center">
                <p className='text-6xl md:text-8xl font-light tracking-tight'>{getEventDayNumber()}</p>
                <p className='text-main text-lg md:text-xl font-extrabold'>{getEventMonthName().substring(0, 3).toUpperCase()}</p>
            </div>
            <div className="mx-auto">
                <p className='text-4xl md:text-[44px] font-light'>{getDayOfWeek().toUpperCase()}</p>
                <p className='text-xl font-bold text-txt-300 text-center'>@ {getTime()}</p>
            </div>
        </div>
        <div className="h-[300px] grid place-items-center">
            {getTitle()}
        </div>
    </div>
}

export default EventCell2

const EventDetailRow = ({ title, content, icon }: { title: string, content: string, icon?: JSX.Element }) => {
    return <div className="grid place-items-center space-y-2 pt-4">
        <div className="flex items-center">
            {icon == undefined ? <></> : <div className='pr-2'>{icon}</div>}
            <h5 className='text-xl font-medium tracking-tight'>{title}</h5>
        </div>
        <p className='text-txt-300 max-w-lg text-center'>{content}</p>
    </div>
}