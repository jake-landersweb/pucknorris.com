import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { queryClient } from '../../components/query-client';
import JerseysClient from './client';

// Hardcoded for testing — replace when team context is wired up
const TEAM_ID = 'Tdc0a36cdb7a747348209ca162b09ee0a';

export default async function JerseysPage() {
  await queryClient.prefetchQuery({
    queryKey: ['jerseys', TEAM_ID],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/jerseys?teamId=${TEAM_ID}`,
        { cache: 'no-store' }
      );
      if (!res.ok) return [];
      return res.json();
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JerseysClient teamId={TEAM_ID} />
    </HydrationBoundary>
  );
}
