"use client"

import { useQuery } from "@tanstack/react-query"
import { JSX, useState, useEffect } from "react"
import BoundsWrapper from "../components/boundsWrapper"
import Image from "../components/image"
import Link from "../components/link"
import PageHeader from "../components/pageHeader"
import SeasonNodeCell from "../components/seasonNode"
import getSchedule from "../lib/apiRoutes/getSchedule"
import shopifyClient from "../lib/apiRoutes/shopifyClient"
import { serializeData } from "../utils/serialize"

const IndexClient = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
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
        if (schedule === undefined) {
            return []
        }

        const nextGames: JSX.Element[] = []
        const previousGames: JSX.Element[] = []

        for (var i = 0; i < schedule['body'].length; i++) {
            if (schedule['body'][i].nextEvent != undefined) {
                nextGames.push(<SeasonNodeCell key={`schedule-cell-next-${i}`} title={schedule['body'][i]['title']} event={schedule['body'][i]['nextEvent']} isPrevious={false} />)
            }
            if (schedule['body'][i].previousEvent != undefined) {
                previousGames.push(<SeasonNodeCell key={`schedule-cell-previous-${i}`} title={schedule['body'][i]['title']} event={schedule['body'][i]['previousEvent']} isPrevious={true} compact={true} />)
            }
        }

        const items: JSX.Element[] = []

        if (nextGames.length > 0) {
            items.push(
                <div key="next-games-row" className={`grid grid-cols-1 gap-4 ${nextGames.length >= 2 ? "lg:grid-cols-2" : "lg:grid-cols-1"}`}>
                    {nextGames}
                </div>
            )
        }

        if (previousGames.length > 0) {
            items.push(
                <div key="previous-games-row" className={`grid grid-cols-1 gap-4 ${previousGames.length >= 2 ? "lg:grid-cols-2" : "lg:grid-cols-1"}`}>
                    {previousGames}
                </div>
            )
        }

        return items
    }

    const getMerchItems = () => {
        if (merchResponse === undefined) {
            return []
        }
        return merchResponse.filter((item: any) =>
            item.title.toLowerCase().includes("sweatshirt") || item.title.toLowerCase().includes("tshirt")
        )
    }

    const merchItems = getMerchItems()

    useEffect(() => {
        if (merchItems.length <= 1) return
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % merchItems.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [merchItems.length])

    const merchSlideshow = () => {
        if (merchItems.length === 0) return null

        return (
            <div className="relative w-[320px] h-[160px] overflow-hidden">
                {merchItems.map((item: any, index: number) => (
                    <div
                        key={`merch-slide-${index}`}
                        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out ${
                            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                    >
                        <Link props={{
                            href: item.onlineStoreUrl ?? `https://shop.pucknorris.com/products/${item.title.split(" ").join("-").toLowerCase()}`,
                            child: (
                                <Image props={{
                                    src: item.images[0].src,
                                    alt: item.title,
                                    divClass: "overflow-hidden rounded-lg grid place-items-center",
                                    imgClass: "h-[150px] w-auto object-contain group-hover:scale-105 transition-transform"
                                }} />
                            ),
                            isExternal: true,
                            className: "group"
                        }} />
                    </div>
                ))}
                {/* Slide indicators */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1.5 pb-1">
                    {merchItems.map((_: any, index: number) => (
                        <button
                            key={`indicator-${index}`}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                                index === currentSlide ? "bg-main" : "bg-gray-500"
                            }`}
                        />
                    ))}
                </div>
            </div>
        )
    }

    return <BoundsWrapper>
        <div className="flex flex-col items-center">
            {/* Logo and Schedule side by side */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-4 lg:gap-8 pb-6 lg:pb-8 w-full px-4 lg:px-0">
                <div className="flex-shrink-0 flex flex-col items-center">
                    <Image props={{
                        src: "/images/pucknorris.png",
                        alt: "Puck Norris Logo",
                        divClass: "",
                        imgClass: "h-[150px] sm:h-[200px] md:h-[300px]"
                    }} />
                    {/* Featured Merch Slideshow */}
                    <div className="mt-8">
                        <h3 className="text-base font-bold text-main text-center mb-1">Featured Merch</h3>
                        {merchSlideshow()}
                        <Link props={{
                            href: "https://shop.pucknorris.com/",
                            child: <p className="text-sm text-main hover:underline mt-1">Visit Store</p>,
                            isExternal: true,
                            className: "text-center block"
                        }} />
                    </div>
                </div>
                <div className="space-y-4 flex flex-col items-stretch">
                    {/* Content section */}
                    <div className="space-y-2 text-center border-2 border-main rounded-lg p-4 shadow-[0_0_15px_rgba(255,200,0,0.15)]">
                        <h2 className="text-2xl lg:text-4xl font-medium font-gains tracking-wide">Puck Norris Hockey Club</h2>
                        <h4 className="text-main text-xl lg:text-2xl font-gains">Blood, Sweat, &#38; Beers!</h4>
                        <p className="text-gray-500 text-sm lg:text-base">The most badass men's league hockey team in the PNW! We play hockey, have fun, and most importantly, drink good beer.</p>
                        <Link props={{
                            href: "/chat",
                            child: <>
                                <div className="grid place-items-center pt-2">
                                    <div className="bg-main text-black rounded-md px-3 py-1.5 md:hover:opacity-50 transition-opacity text-sm">
                                        <p>Chat with our Hockey AI ChatBots!</p>
                                    </div>
                                </div>
                            </>,
                            isExternal: undefined,
                            className: undefined
                        }} />
                    </div>
                    {/* Schedule section */}
                    <div className="border-2 border-main rounded-lg p-4 shadow-[0_0_15px_rgba(255,200,0,0.15)] space-y-4">
                        {upcomingCells()}
                    </div>
                </div>
            </div>
        </div>
    </BoundsWrapper>
}

export default IndexClient