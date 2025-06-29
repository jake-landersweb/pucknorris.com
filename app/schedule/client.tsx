"use client"

import { useQuery } from "@tanstack/react-query"
import BoundsWrapper from "../../components/boundsWrapper"
import PageHeader from "../../components/pageHeader"
import SeasonNodeCell from "../../components/seasonNode"
import SeasonNodeCellFull from "../../components/seasonNodeFull"
import getScheduleFull from "../../lib/apiRoutes/getScheduleFull"
import slufigy from "../../lib/functions/slugify"

const ScheduleClient = () => {
    const scheduleResponse = useQuery({
        queryKey: ["full-schedule"],
        queryFn: () => getScheduleFull(),
    })

    if (scheduleResponse.error) {
        return <div className="">Failed to fetch the schedule</div>
    }

    const schedule = scheduleResponse.data

    const seasonNodes = () => {
        console.log(schedule)
        const items = []
        for (var i = 0; i < schedule.body.length; i++) {
            items.push(<div key={`schedule-cell-${i}`} id={schedule.body[i].title}><SeasonNodeCellFull node={schedule['body'][i]} /></div>)
        }
        return items
    }

    const header = () => {
        const items = []
        for (var i = 0; i < schedule['body'].length; i++) {
            items.push(<div><h3 className="text-2xl text-gray-400 hover:text-white transition-all hover:underline"><a href={`#${slufigy(schedule['body'][i].title)}`}>{schedule['body'][i].title}</a></h3></div>)
            if (i != schedule['body'].length - 1) {
                items.push(<div className="w-[0.5px] h-[10px] bg-gray-600 hidden md:block"></div>)
            }
        }
        return items
    }


    return <div className="">
        <PageHeader className="pb-4">
            <p className="max-w-2xl text-gray-500 text-center text-xl">Puck Norris has multiple active seasons at any given time. This schedule page gives a comprehensive schedule of the currently active seasons.</p>
        </PageHeader>
        <BoundsWrapper>
            <div className="space-y-4">
                {/* <div className={`grid place-items-center pb-4`}>
                    <div className="md:flex md:items-center md:space-x-10 space-y-4 md:space-y-0 grid place-items-center">
                        {header()}
                    </div>
                </div> */}
                <div className="grid lg:grid-cols-2 gap-4">
                    {seasonNodes()}
                </div>
            </div>
        </BoundsWrapper>
    </div>
}

export default ScheduleClient