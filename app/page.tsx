// Fetch runtime configuration/data on the server, never prerender CI placeholders.
export const dynamic = "force-dynamic";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { makeQueryClient } from "../components/query-client"
import getSchedule from "../lib/apiRoutes/getSchedule"
import shopifyClient from "../lib/apiRoutes/shopifyClient"
import { serializeData } from "../utils/serialize"
import IndexClient from "./client"

export default async function Index() {
  const queryClient = makeQueryClient();
    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: ["current-schedule"],
            queryFn: () => getSchedule(),
        }),
        queryClient.prefetchQuery({
            queryKey: ["shopify-products-all"],
            queryFn: async () => {
                const products = await shopifyClient().product.fetchAll()
                return serializeData(products)
            },
        }),
    ])

    return <HydrationBoundary state={dehydrate(queryClient)}>
        <IndexClient />
    </HydrationBoundary>
}