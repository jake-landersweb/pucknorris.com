import Event from "./event"

type SeasonNode = {
    title: string
    nextEvent?: Event
    previousEvent?: Event
}

export default SeasonNode