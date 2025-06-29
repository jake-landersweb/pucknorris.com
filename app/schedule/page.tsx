import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { queryClient } from "../../components/query-client"
import getScheduleFull from "../../lib/apiRoutes/getScheduleFull"
import ScheduleClient from "./client"

export default async function Schedule() {
    await queryClient.prefetchQuery({
        queryKey: ["full-schedule"],
        queryFn: () => getScheduleFull(),
    })

    return <HydrationBoundary state={dehydrate(queryClient)}>
        <ScheduleClient />
    </HydrationBoundary>
}