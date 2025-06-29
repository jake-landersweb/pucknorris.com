import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { queryClient } from "../../components/query-client"
import getGallery from "../../lib/apiRoutes/getGallery"
import { serializeData } from "../../utils/serialize"
import GalleryClient from "./client"

export default async function Gallery() {
    await queryClient.prefetchQuery({
        queryKey: ["gallery"],
        queryFn: async () => {
            const resp = await getGallery()
            return serializeData(resp)
        },
    })

    return <HydrationBoundary state={dehydrate(queryClient)}>
        <GalleryClient />
    </HydrationBoundary>
}