import Event from "./event"

type SeasonNodeFull = {
    title: string
    nextEvents?: Event[]
    previousEvents?: Event[]
}

export default SeasonNodeFull