import Event from "../lib/data/event"
import SeasonNode from "../lib/data/seasonNode"
import EventCell from "./eventCell"

const SeasonNodeCell = ({ title, event, isPrevious }: { title: string, event: Event, isPrevious: boolean }) => {
    return <div className=" text-center space-y-4 flex flex-col items-center">
        <div className="">
            <p className="text-gray-500">{isPrevious ? "Previous" : "Next"} game for</p>
            <h3 className="text-3xl md:text-4xl font-medium text-gray-300">{title}</h3>
        </div>
        <EventCell event={event} />
    </div>
}

export default SeasonNodeCell