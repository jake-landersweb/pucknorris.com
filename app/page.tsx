import BoundsWrapper from "../components/boundsWrapper"
import PageHeader from "../components/pageHeader"
import SeasonNodeCellSmall from "../components/seasonNodeSmall"
import getSchedule from "../lib/apiRoutes/getSchedule"

const Index = async () => {
    const schedule = await getSchedule()

    const upcomingCells = () => {
        const items = []

        for (var i = 0; i < schedule['body'].length; i++) {
            if (schedule['body'][i].nextEvent != undefined) {
                items.push(<SeasonNodeCellSmall node={schedule['body'][i]} />)
            }
        }
        return items
    }

    return <BoundsWrapper>
        <div className="flex flex-col items-center">
            <PageHeader>
                <div className="space-y-2">
                    <h2 className="text-4xl lg:text-6xl font-medium text-center lg:text-left pt-4">Puck Norris Hockey Club</h2>
                    <p className="max-w-2xl text-gray-500 text-center">The most badass men's league hockey team in the pacific northwest! We like to play hockey, have fun, and most importantly drink good beer together. This site is powered by Crosscheck Sports, which you can learn more about <a target="_blank" rel="noopener noreferrer" href="https://crosschecksports.com" className="underline md:hover:no-underline">here.</a></p>
                </div>
            </PageHeader>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {upcomingCells()}
            </div>
        </div>
    </BoundsWrapper>
}

export default Index