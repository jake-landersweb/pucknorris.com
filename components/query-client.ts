import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false,
            retry: 2,
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 5,
        },
    },
});
