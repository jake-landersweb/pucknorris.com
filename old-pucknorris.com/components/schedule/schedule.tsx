import { useState } from "react"
import SeasonNode from "../../data/seasonNode"
import Picker from "../picker"
import SeasonNodeCell from "./seasonNodeCell"

const Schedule = ({ seasonNodes }: { seasonNodes: SeasonNode[] }) => {
    const items = []

    const [index, setIndex] = useState(0)

    const titles = []


    for (var i = 0; i < seasonNodes.length; i++) {
        const idx = i
        if (seasonNodes[idx].nextEvent != undefined || seasonNodes[idx].previousEvent != undefined) {
            titles.push(seasonNodes[idx].title)
            items.push(<SeasonNodeCell seasonNode={seasonNodes[idx]} />)
        }
    }

    return <div className="space-y-4 content-center">
        <div className="flex justify-center">
            <Picker titles={titles} onTap={function (idx: number): void {
                setIndex(idx)
                console.log(idx)
            }} />
        </div>
        {items[index]}
        <p className="text-sm text-txt-500 text-right">Powered by <a href="https://crosschecksports.com" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-50">Crosscheck Sports</a></p>
    </div >
}

export default Schedule