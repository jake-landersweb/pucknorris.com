"use client";

import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { isServer, QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 60 * 1000, // 1 hour
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

let persister: ReturnType<typeof createAsyncStoragePersister> | undefined;

if (typeof window !== "undefined") {
  persister = createAsyncStoragePersister({
    storage: window.localStorage,
  });
}

export function getQueryClient() {
  if (isServer) {
    // get a new query client on the server
    return makeQueryClient();
  } else {
    // only make a new one if we do not have one
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function TanstackQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: persister! }}
    >
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  );
}
