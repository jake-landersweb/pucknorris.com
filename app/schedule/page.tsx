import BoundsWrapper from "../../components/boundsWrapper"
import PageHeader from "../../components/pageHeader"
import SeasonNodeCell from "../../components/seasonNode"
import SeasonNodeCellFull from "../../components/seasonNodeFull"
import getScheduleFull from "../../lib/apiRoutes/getScheduleFull"
import slufigy from "../../lib/functions/slugify"

const Schedule = async () => {
    const schedule = await getScheduleFull()

    const seasonNodes = () => {
        const items = []
        for (var i = 0; i < schedule['body'].length; i++) {
            items.push(<div id={schedule['body'][i].title}><SeasonNodeCellFull node={schedule['body'][i]} /></div>)
        }
        return items
    }

    const header = () => {
        const items = []
        for (var i = 0; i < schedule['body'].length; i++) {
            const cells = []
            if (schedule['body'][i]['nextEvents'] != undefined) {
                cells.push(<p className="text-xl text-txt-300 md:hover:text-txt-600 transition-all underline md:hover:no-underline"><a href={`#${slufigy(schedule['body'][i].title)}-next`}>Next Events</a></p>)
            }
            if (schedule['body'][i]['previousEvents'] != undefined) {
                cells.push(<p className="text-xl text-txt-300 md:hover:text-txt-600 transition-all underline md:hover:no-underline"><a href={`#${slufigy(schedule['body'][i].title)}-past`}>Previous Events</a></p>)
            }
            if (cells.length > 0) {
                items.push(<div><h3 className="text-2xl md:text-3xl font-medium md:hover:text-gray-400 transition-all"><a href={`#${slufigy(schedule['body'][i].title)}`}>{schedule['body'][i].title}</a></h3><div className="space-y-2">{cells}</div></div>)
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
                <div className="grid place-items-center">
                    <div className="text-center">
                        {header()}
                    </div>
                </div>
                {seasonNodes()}
            </div>
        </BoundsWrapper>
    </div>
}

export default Schedule