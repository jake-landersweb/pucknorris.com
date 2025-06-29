import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { queryClient } from "../components/query-client"
import getSchedule from "../lib/apiRoutes/getSchedule"
import shopifyClient from "../lib/apiRoutes/shopifyClient"
import { serializeData } from "../utils/serialize"
import IndexClient from "./client"

export default async function Index() {
    await queryClient.prefetchQuery({
        queryKey: ["current-schedule"],
        queryFn: () => getSchedule(),
    })

    await queryClient.prefetchQuery({
        queryKey: ["shopify-products-all"],
        queryFn: async () => {
            const products = await shopifyClient.product.fetchAll()
            return serializeData(products)
        },
    })

    return <HydrationBoundary state={dehydrate(queryClient)}>
        <IndexClient />
    </HydrationBoundary>
}