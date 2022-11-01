import SeasonNodeFull from "../lib/data/seasonNodeFull"
import slufigy from "../lib/functions/slugify"
import EventCell from "./eventCell"
import EventCellCompact from "./eventCellCompact"

const SeasonNodeCellFull = ({ node }: { node: SeasonNodeFull }) => {
    const events = (isPrevious: boolean) => {
        const cells = []
        if (isPrevious) {
            if (node.previousEvents == undefined) {
                return null
            }
            for (var i = 0; i < node.previousEvents!.length; i++) {
                cells.push(<div className={`${i < node.previousEvents!.length - 1 ? "border-b border-b-bg-500" : ""}`}><EventCellCompact event={node.previousEvents![i]} /></div>)
            }
        } else {
            if (node.nextEvents == undefined) {
                return null
            }
            for (var i = 0; i < node.nextEvents!.length; i++) {
                cells.push(<div className={`${i < node.nextEvents!.length - 1 ? "border-b border-b-bg-500" : ""}`}><EventCellCompact event={node.nextEvents![i]} /></div>)
            }
        }
        return cells
    }

    const schedule = (isPrevious: boolean) => {
        if (node.nextEvents == undefined) {
            return null
        }
        return <div id={`${slufigy(node.title)}-${isPrevious ? "past" : "next"}`} className="space-y-4">
            <h3 className="text-4xl font-bold">{isPrevious ? "Previous Events" : "Next Events"}</h3>
            <div className="bg-bg-700 rounded-md">
                {events(isPrevious)}
            </div>
        </div>
    }

    return <div className="space-y-4">
        <h2 id={slufigy(node.title)} className="text-5xl md:text-6xl">{node.title}</h2>
        <div className="lg:flex lg:space-x-2 space-y-4 lg:space-y-0">
            {schedule(false)}
            {schedule(true)}
        </div>
    </div>
}

export default SeasonNodeCellFull