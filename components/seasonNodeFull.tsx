import SeasonNodeFull from "../lib/data/seasonNodeFull"
import Event from "../lib/data/event"
import slufigy from "../lib/functions/slugify"
import EventCellCompact from "./eventCellCompact"

function computeRecord(events: Event[] = []) {
    let wins = 0, losses = 0, ties = 0
    for (const event of events) {
        if (event.eventType !== 1) continue
        const homeScore = event.homeTeam.score
        const awayScore = event.awayTeam.score
        if (homeScore == null && awayScore == null) continue
        const isHome = event.homeTeam.teamId === process.env.NEXT_PUBLIC_TEAMID
        const pnScore = isHome ? (homeScore ?? 0) : (awayScore ?? 0)
        const oppScore = isHome ? (awayScore ?? 0) : (homeScore ?? 0)
        if (pnScore > oppScore) wins++
        else if (pnScore < oppScore) losses++
        else ties++
    }
    return { wins, losses, ties }
}

const SeasonNodeCellFull = ({ node }: { node: SeasonNodeFull }) => {
    const { wins, losses, ties } = computeRecord(node.previousEvents)
    const gamesPlayed = wins + losses + ties
    const hasPrevious = (node.previousEvents?.length ?? 0) > 0
    const hasNext = (node.nextEvents?.length ?? 0) > 0

    const eventRows = (events: Event[]) =>
        events.map((event, i) => (
            <div key={`event-${i}`} className={i < events.length - 1 ? "border-b border-white/10" : ""}>
                <EventCellCompact event={event} />
            </div>
        ))

    return (
        <div id={slufigy(node.title)} className="border border-white/15 rounded-xl p-5 space-y-4">

            {/* Season header + record */}
            <div className="flex items-start justify-between flex-wrap gap-2">
                <h2 className="text-xl md:text-2xl font-bold text-white">{node.title}</h2>
                {gamesPlayed > 0 && (
                    <div className="text-sm text-right">
                        <span className="text-gray-500">Season Record: </span>
                        <span className="text-green-400 font-medium">{wins} {wins === 1 ? 'Win' : 'Wins'}</span>
                        <span className="text-gray-600">, </span>
                        <span className="text-red-400 font-medium">{losses} {losses === 1 ? 'Loss' : 'Losses'}</span>
                        {ties > 0 && (
                            <><span className="text-gray-600">, </span><span className="text-gray-300 font-medium">{ties} {ties === 1 ? 'Tie' : 'Ties'}</span></>
                        )}
                    </div>
                )}
            </div>

            {/* Upcoming games */}
            {hasNext && (
                <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Upcoming</p>
                    <div className="rounded-lg overflow-hidden bg-bg-700">
                        {eventRows(node.nextEvents!)}
                    </div>
                </div>
            )}

            {/* Previous games */}
            {hasPrevious && (
                <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Previous Games</p>
                    <div className="rounded-lg overflow-hidden bg-bg-700">
                        {eventRows(node.previousEvents!)}
                    </div>
                </div>
            )}

        </div>
    )
}

export default SeasonNodeCellFull
