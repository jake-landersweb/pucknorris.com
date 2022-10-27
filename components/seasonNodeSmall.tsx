import SeasonNode from "../lib/data/seasonNode"
import EventCell from "./eventCell"

const SeasonNodeCellSmall = ({ node }: { node: SeasonNode }) => {
    return <div className=" text-center space-y-4 flex flex-col items-center">
        <div className="">
            <p className="text-gray-500">Next game for</p>
            <h3 className="text-3xl md:text-4xl font-medium text-gray-300">{node.title}</h3>
        </div>
        <EventCell event={node.nextEvent!} />
    </div>
}

export default SeasonNodeCellSmall