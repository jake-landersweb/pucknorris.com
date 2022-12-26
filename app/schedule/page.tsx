import BoundsWrapper from "../../components/boundsWrapper"
import PageHeader from "../../components/pageHeader"
import SeasonNodeCell from "../../components/seasonNode"
import SeasonNodeCellFull from "../../components/seasonNodeFull"
import getScheduleFull from "../../lib/apiRoutes/getScheduleFull"
import slufigy from "../../lib/functions/slugify"

const Schedule = async () => {
    const schedule = await getScheduleFull()

    const seasonNodes = () => {
        console.log(schedule)
        const items = []
        for (var i = 0; i < schedule.body.length; i++) {
            items.push(<div id={schedule.body[i].title}><SeasonNodeCellFull node={schedule['body'][i]} /></div>)
        }
        return items
    }

    const header = () => {
        const items = []
        for (var i = 0; i < schedule['body'].length; i++) {
            items.push(<div><h3 className="text-2xl md:text-3xl font-medium text-main transition-all hover:opacity-75 hover:underline"><a href={`#${slufigy(schedule['body'][i].title)}`}>- {schedule['body'][i].title}</a></h3></div>)
        }
        return items
    }


    return <div className="">
        <PageHeader>
            <p className="max-w-2xl text-gray-500 text-center">Puck Norris has a few different active seasons at any given time. This schedule page is meant to giev a nice comprehensive overview of the schedule of the currently active seasons.</p>
        </PageHeader>
        <BoundsWrapper>
            <div className="space-y-4">
                <div className="grid place-items-center">
                    <div className="text-center space-y-2">
                        {header()}
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-4">
                    {seasonNodes()}
                </div>
            </div>
        </BoundsWrapper>
    </div>
}

export default Schedule