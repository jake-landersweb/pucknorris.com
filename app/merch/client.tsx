"use client"

import { useQuery } from "@tanstack/react-query";
import BoundsWrapper from "../../components/boundsWrapper";
import Link from "../../components/link";
import PageHeader from "../../components/pageHeader";
import shopifyClient from "../../lib/apiRoutes/shopifyClient"
import { serializeData } from "../../utils/serialize";
import MerchView from "./merchView";

const MerchClient = () => {
    const merchResponseResponse = useQuery({
        queryKey: ["shopify-products-all"],
        queryFn: async () => {
            const products = await shopifyClient.product.fetchAll()
            return serializeData(products)
        },
    })

    if (merchResponseResponse.error || merchResponseResponse.data === undefined) {
        return <div className="">There was an error fetching the merch items</div>
    }

    const merchResponse = merchResponseResponse.data

    return <BoundsWrapper>
        <div className="">
            <PageHeader>
                <p className="max-w-2xl text-gray-500 text-center">High quality merchandise to rep the most badass hockey team in the pacific northwest! Visit the shopify store for a more comprehensive experience.</p>
                <div className="pt-4">
                    <Link props={{
                        href: 'https://shop.pucknorris.com',
                        child: <>Shopify Store</>,
                        isExternal: true,
                        className: "px-4 py-2 bg-bg-700 border border-bg-500 rounded-md font-medium hover:bg-bg-500 transition-all"
                    }} />
                </div>
            </PageHeader>
            <MerchView products={merchResponse} />
        </div>
    </BoundsWrapper>
}

export default MerchClient