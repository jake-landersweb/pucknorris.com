import BoundsWrapper from "../components/boundsWrapper"
import Image from "../components/image"
import Link from "../components/link"
import PageHeader from "../components/pageHeader"
import SeasonNodeCell from "../components/seasonNode"
import getSchedule from "../lib/apiRoutes/getSchedule"
import shopifyClient from "../lib/apiRoutes/shopifyClient"

const Index = async () => {
    const schedule = await getSchedule()
    const merchResponse = await shopifyClient.product.fetchAll();

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

    const merch = () => {
        const cells = []
        for (var i = 0; i < merchResponse.length; i++) {
            if (merchResponse[i].title.toLowerCase().includes("sweatshirt") || merchResponse[i].title.toLowerCase().includes("tshirt")) {
                cells.push(
                    <Link props={{
                        href: merchResponse[i].onlineStoreUrl ?? `https://shop.pucknorris.com/products/${merchResponse[i].title.split(" ").join("-").toLowerCase()}`,
                        child: <>
                            <Image props={{
                                src: merchResponse[i].images[0].src,
                                alt: "Product Image",
                                divClass: "overflow-hidden rounded-lg grid place-items-center",
                                imgClass: "md:group-hover:scale-105 transition-all md:max-w-[150px] max-w-[100px]"
                            }} />
                        </>,
                        isExternal: true,
                        className: "group"
                    }} />
                )
            }
        }
        return cells
    }

    return <BoundsWrapper>
        <div className="flex flex-col items-center">
            <PageHeader>
                <div className="space-y-2">
                    <h2 className="text-4xl lg:text-6xl font-medium text-center pt-4 font-gains tracking-wide">Puck Norris Hockey Club</h2>
                    <h4 className="text-main text-3xl font-gains">Blood, Sweat, &#38; Beers!</h4>
                    <p className="max-w-2xl text-gray-500 text-center md:text-xl">The most badass men's league hockey team in the PNW! We play hockey, have fun, and most importantly, drink good beer.</p>
                    <h3 className="text-xl font-bold text-gray-400">Featured Merchandise</h3>
                    <div className="grid place-items-center">
                        <div className="flex space-x-4 items-center">
                            {merch()}
                        </div>
                    </div>
                </div>
            </PageHeader>
            <BoundsWrapper>
                <div className="space-y-4">
                    {upcomingCells()}
                </div>
            </BoundsWrapper>
        </div>
    </BoundsWrapper>
}

export default Index