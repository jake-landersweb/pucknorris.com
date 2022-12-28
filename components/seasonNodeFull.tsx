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
            } else {
                for (var i = 0; i < node.previousEvents!.length; i++) {
                    cells.push(<div className={`${i < node.previousEvents!.length - 1 ? "border-b border-b-bg-500" : ""}`}><EventCellCompact event={node.previousEvents![i]} /></div>)
                }
            }
        } else {
            if (node.nextEvents == undefined) {
                return null
            } else {
                for (var i = 0; i < node.nextEvents!.length; i++) {
                    cells.push(<div className={`${i < node.nextEvents!.length - 1 ? "border-b border-b-bg-500" : ""}`}><EventCellCompact event={node.nextEvents![i]} /></div>)
                }
            }
        }
        return cells
    }

    const schedule = (isPrevious: boolean) => {
        if ((!isPrevious && node.nextEvents == undefined) || (isPrevious && node.previousEvents == undefined)) {
            return null
        }
        return <div id={`${slufigy(node.title)}-${isPrevious ? "past" : "next"}`} className="space-y-2">
            <h3 className={`text-xl font-bold text-gray-500 ${isPrevious ? "" : "hidden"}`}>{isPrevious ? "Previous Events".toUpperCase() : "Next Events".toUpperCase()}</h3>
            <div className="bg-bg-700 rounded-md">
                {events(isPrevious)}
            </div>
        </div>
    }

    return <div className="space-y-4">
        <h2 id={slufigy(node.title)} className="text-4xl md:text-5xl">{node.title}</h2>
        <div className="space-y-2">
            {schedule(false)}
            {schedule(true)}
        </div>
    </div>
}

export default SeasonNodeCellFull