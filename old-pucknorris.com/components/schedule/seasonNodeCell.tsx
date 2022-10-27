import Event from '../../data/event'
import SeasonNode from '../../data/seasonNode'
import EventCell2 from './eventCell2'

const SeasonNodeCell = ({ seasonNode }: { seasonNode: SeasonNode }) => {

    const getVerb = (event: Event) => {
        if (event.eventType == 1) {
            return "Game"
        } else {
            return "Event"
        }
    }

    const getGrid = () => {
        if (seasonNode.nextEvent != undefined && seasonNode.previousEvent != undefined) {
            return "grid-cols-1 md:grid-cols-2"
        } else {
            return "grid-cols-1"
        }
    }

    return <div className="text-center">
        <h2 className='text-4xl font-bold pb-4'>{seasonNode.title}</h2>
        <div className={`grid gap-4 place-items-center ${getGrid()}`}>
            {seasonNode.previousEvent == undefined ? <></> : <EventCell2 className='order-1 md:order-0' event={seasonNode.previousEvent!} headerText={"Previous " + getVerb(seasonNode.previousEvent!)} isPrevious={true} />}
            {seasonNode.nextEvent == undefined ? <></> : <EventCell2 className='order-0 md:order-1' event={seasonNode.nextEvent!} headerText={"Next " + getVerb(seasonNode.nextEvent!)} isPrevious={false} />}
        </div>
    </div>
}

export default SeasonNodeCell