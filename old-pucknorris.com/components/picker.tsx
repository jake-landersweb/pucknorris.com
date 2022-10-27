import { useState } from "react"

type PickerProps = {
    titles: string[]
    initIndex?: number
    onTap: (s: number) => void
}

const PickerItem = ({ title, idx, length, onTap }: { title: string, idx: number, length: number, onTap: () => void }) => {

    const getRoundedness = () => {
        if (length == 1) {
            return "rounded-md"
        }
        if (idx == 0) {
            return "md:rounded-l-md md:rounded-tr-none rounded-t-md"
        }
        if (idx == length - 1) {
            return "md:rounded-r-md md:rounded-bl-none rounded-b-md"
        }
        return ""
    }

    return <button onClick={() => onTap()}>
        <div className={`bg-bg-700 px-4 py-[10px] ${getRoundedness()}`}>
            <p className="truncate">{title}</p>
        </div>
    </button>
}

const Picker = (props: PickerProps) => {
    const { titles, initIndex = 0, onTap } = props

    const [index, setIndex] = useState(initIndex)

    const getIndicatorAlignment = () => {
        if (titles.length == 1) {
            return "left-[0%] -translate-x-[0%]"
        } else if (titles.length == 2) {
            switch (index) {
                case 0: return "left-[0%] -translate-x-[0%] top-[0%] "
                default: return "left-[100%] -translate-x-[100%] md:top-[0%] top-[50%]"
            }
        } else if (titles.length == 3) {
            switch (index) {
                case 0: return "left-[0%] -translate-x-[0%] top-[0%]"
                case 1: return "left-[50%] -translate-x-1/2 md:top-[0%] top-1/3"
                default: return "left-[100%] -translate-x-[100%] md:top-[0%] top-2/3"
            }
        } else if (titles.length == 4) {
            switch (index) {
                case 0: return "left-[0%] -translate-x-[0%] top-[0%]"
                case 1: return "left-1/3 -translate-x-1/3 md:top-[0%] top-1/4"
                case 2: return "left-2/3 -translate-x-2/3 md:top-[0%] top-1/2"
                default: return "left-[100%] -translate-x-[100%] md:top-[0%] top-3/4"
            }
        } else if (titles.length == 5) {
            switch (index) {
                case 0: return "left-[0%] -translate-x-[0%] top-[0%]"
                case 1: return "left-1/4 -translate-x-1/4"
                case 2: return "left-1/2 -translate-x-1/2"
                case 3: return "left-3/4 -translate-x-3/4"
                default: return "left-[100%] -translate-x-[100%]"
            }
        } else {
            return ""
        }
    }

    const getGridAlignment = () => {
        switch (titles.length) {
            case 1: return "grid-cols-1"
            case 2: return "grid-cols-2"
            case 3: return "grid-cols-3"
            case 4: return "grid-cols-4"
            case 5: return "grid-cols-5"
            default: return ""
        }
    }

    const getIndicatorWidth = () => {
        switch (titles.length) {
            case 1: return "w-[100%] md:w-[100%]"
            case 2: return "w-[100%] md:w-[50%]"
            case 3: return "w-[100%] md:w-[33.3%]"
            case 4: return "w-[100%] md:w-[25%]"
            case 5: return "w-[100%] md:w-[20%]"
            default: return ""
        }
    }

    const getIndicatorHeight = () => {
        switch (titles.length) {
            case 1: return "h-[100%]"
            case 2: return "h-[50%]"
            case 3: return "h-[33.3%]"
            case 4: return "h-[25%]"
            case 5: return "h-[20%]"
            default: return ""
        }
    }

    const items = () => {
        const cells = []

        for (var i = 0; i < titles.length; i++) {
            const idx = i
            cells.push(<PickerItem title={titles[idx]} idx={idx} length={titles.length} onTap={() => {
                setIndex(idx)
                onTap(idx)
            }} />)
        }
        return cells
    }

    return <div className="flex relative border-4 border-bg-500 rounded-md">
        <div className={`md:grid ${getGridAlignment()} flex flex-col md:flex-none w-full bg-bg-500`}>
            {items()}
        </div>
        <div className={`absolute bg-main transition-all pointer-events-none grid place-items-center h-full z-0 rounded-md text-center truncate ${getIndicatorWidth()} ${getIndicatorHeight()} md:h-full ${getIndicatorAlignment()}`}>{titles[index]}</div>
    </div>
}

export default Picker