"use client"

import { useQuery } from "@tanstack/react-query"
import { JSX } from "react"
import BoundsWrapper from "../components/boundsWrapper"
import Image from "../components/image"
import Link from "../components/link"
import PageHeader from "../components/pageHeader"
import SeasonNodeCell from "../components/seasonNode"
import getSchedule from "../lib/apiRoutes/getSchedule"
import shopifyClient from "../lib/apiRoutes/shopifyClient"
import { serializeData } from "../utils/serialize"

const IndexClient = () => {
    const scheduleResponse = useQuery({
        queryKey: ["current-schedule"],
        queryFn: () => getSchedule(),
    })

    const merchResponseResponse = useQuery({
        queryKey: ["shopify-products-all"],
        queryFn: async () => {
            const products = await shopifyClient.product.fetchAll()
            return serializeData(products)
        },
    })

    if (scheduleResponse.isLoading || merchResponseResponse.isLoading) {
        return <div className="">Loading</div>
    }

    const schedule = scheduleResponse.data
    const merchResponse = merchResponseResponse.data


    const upcomingCells = () => {
        const items: JSX.Element[] = []

        if (schedule === undefined) {
            return items
        }

        for (var i = 0; i < schedule['body'].length; i++) {
            const cells = []
            if (schedule['body'][i].previousEvent != undefined) {
                cells.push(<SeasonNodeCell key={`schedule-cell-previous-${i}`} title={schedule['body'][i]['title']} event={schedule['body'][i]['previousEvent']} isPrevious={true} />)
            }
            if (schedule['body'][i].nextEvent != undefined) {
                cells.push(<SeasonNodeCell key={`schedule-cell-next-${i}`} title={schedule['body'][i]['title']} event={schedule['body'][i]['nextEvent']} isPrevious={false} />)
            }
            if (cells.length > 0) {
                items.push(<div key={`upcomming-cell-${i}`} className={`grid grid-cols-1 gap-4 ${cells.length == 2 ? "lg:grid-cols-2" : "lg:grid-cols-1"}`}>{cells}</div>)
            }
        }
        return items
    }

    const merch = () => {
        const cells: JSX.Element[] = []
        if (merchResponse === undefined) {
            return cells
        }

        for (var i = 0; i < merchResponse.length; i++) {
            if (merchResponse[i].title.toLowerCase().includes("sweatshirt") || merchResponse[i].title.toLowerCase().includes("tshirt")) {
                cells.push(
                    <Link key={`merch-cell-${i}`} props={{
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
                    <Link props={{
                        href: "/chat",
                        child: <>
                            <div className="grid place-items-center">
                                <div className="bg-main text-black rounded-md px-4 py-2 md:hover:opacity-50 transition-opacity">
                                    <p>Chat with our Hockey Player AIs ChuckBot 4.0 and Claude-2 Giroux</p>
                                </div>
                            </div>
                        </>,
                        isExternal: undefined,
                        className: undefined
                    }} />
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

export default IndexClient