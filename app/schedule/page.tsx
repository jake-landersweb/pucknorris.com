import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { makeQueryClient } from "../../components/query-client"
import getScheduleFull from "../../lib/apiRoutes/getScheduleFull"
import ScheduleClient from "./client"

export default async function Schedule() {
  const queryClient = makeQueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["full-schedule"],
        queryFn: () => getScheduleFull(),
    })

    return <HydrationBoundary state={dehydrate(queryClient)}>
        <ScheduleClient />
    </HydrationBoundary>
}