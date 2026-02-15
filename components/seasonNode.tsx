import Event from "../lib/data/event"
import SeasonNode from "../lib/data/seasonNode"
import EventCell from "./eventCell"

const SeasonNodeCell = ({ title, event, isPrevious, compact = false }: { title: string, event: Event, isPrevious: boolean, compact?: boolean }) => {
    if (compact) {
        return <div className="text-center space-y-1 flex flex-col items-center">
            <p className="text-gray-400 text-xs">Previous game for {title}</p>
            <EventCell event={event} compact={true} />
        </div>
    }

    return <div className="text-center space-y-2 flex flex-col items-center">
        <div className="">
            <p className="text-gray-500 text-xs">{isPrevious ? "Previous" : "Next"} game for</p>
            <h3 className="text-lg md:text-xl font-medium text-gray-300">{title}</h3>
        </div>
        <EventCell event={event} />
    </div>
}

export default SeasonNodeCell