import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { queryClient } from "../../components/query-client"
import shopifyClient from "../../lib/apiRoutes/shopifyClient"
import { serializeData } from "../../utils/serialize"
import MerchClient from "./client"

export default async function Merch() {
    await queryClient.prefetchQuery({
        queryKey: ["shopify-products-all"],
        queryFn: async () => {
            const products = await shopifyClient.product.fetchAll()
            return serializeData(products)
        },
    })

    return <HydrationBoundary state={dehydrate(queryClient)}>
        <MerchClient />
    </HydrationBoundary>
}