import Event from "./event"

type SeasonNode = {
    title: string
    nextEvent?: Event
    previousEvent?: Event
    eventFields?: string[]
}

export default SeasonNode