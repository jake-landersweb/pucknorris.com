import { useState } from "react"

const Selector = ({ titles, onSelect, selections, initIndex }: { titles: string[], onSelect: (idx: number) => void, selections?: any[], initIndex?: number }) => {
    const [index, setIndex] = useState(initIndex ?? 0)

    const action = (idx: number) => {
        if (selections != undefined) {
            onSelect(selections[idx])
        } else {
            onSelect(idx)
        }
        setIndex(idx)
    }

    const cell = (title: string, idx: number) => {
        return <button onClick={() => action(idx)}>
            <div className={`${idx == index ? "bg-main" : ""} py-2 w-full text-center rounded-md`}>
                <p className="text-xl font-medium">{title}</p>
            </div>
        </button>
    }

    const getCells = () => {
        const items = []
        for (var i = 0; i < titles.length; i++) {
            const idx = i
            items.push(cell(titles[idx], idx))
        }
        return items
    }

    const getGridClass = () => {
        switch (titles.length) {
            case 1: return "grid-cols-1"
            case 2: return "grid-cols-2"
            default: return "grid-cols-3"
        }
    }

    return <div className={`grid bg-bg-600 rounded-md p-1 ${getGridClass()}`}>
        {getCells()}
    </div>
}

export default Selector