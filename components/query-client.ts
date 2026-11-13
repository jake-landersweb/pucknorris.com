import { QueryClient } from "@tanstack/react-query";

// Create one cache per server render; never retain request data in a module singleton.
export const makeQueryClient = () => new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false,
            retry: 2,
            staleTime: 1000 * 60 * 5,
            // The render owns this cache. Avoid timers retaining it after rendering.
            gcTime: Infinity,
        },
    },
});
