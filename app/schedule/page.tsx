import BoundsWrapper from "../../components/boundsWrapper"
import PageHeader from "../../components/pageHeader"
import SeasonNodeCell from "../../components/seasonNode"
import getSchedule from "../../lib/apiRoutes/getSchedule"

const Schedule = async () => {
    const schedule = await getSchedule()

    const upcomingCells = () => {
        const items = []

        for (var i = 0; i < schedule['body'].length; i++) {
            const cells = []
            if (schedule['body'][i].previousEvent != undefined) {
                cells.push(<SeasonNodeCell title={schedule['body'][i]['title']} event={schedule['body'][i]['previousEvent']} isPrevious={true} />)
            }
            if (schedule['body'][i].nextEvent != undefined) {
                cells.push(<SeasonNodeCell title={schedule['body'][i]['title']} event={schedule['body'][i]['nextEvent']} isPrevious={false} />)
            }
            if (cells.length > 0) {
                items.push(<div className={`grid grid-cols-1 gap-4 ${cells.length == 2 ? "lg:grid-cols-2" : "lg:grid-cols-1"}`}>{cells}</div>)
            }
        }
        return items
    }

    return <div className="">
        <PageHeader>
            <p className="max-w-2xl text-gray-500 text-center">Puck Norris has a few different active seasons at any given time. This schedule page is meant to giev a nice comprehensive overview of the schedule of the currently active seasons.</p>
        </PageHeader>
        <BoundsWrapper>
            <div className="space-y-4">
                {upcomingCells()}
            </div>
        </BoundsWrapper>
    </div>
}

export default Schedule