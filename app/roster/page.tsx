import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import PlayerList, { type PlayerRow } from './player-list';

// Season roster: GET /teams/{teamId}/seasons/{seasonId}/users
async function getSeasonRoster(teamId: string, seasonId: string): Promise<PlayerRow[]> {
  try {
    const res = await fetch(
      `${process.env.HOST}/teams/${teamId}/seasons/${seasonId}/users`,
      { cache: 'no-store' }
    );
    const data = await res.json();
    if (data.status !== 200) return [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.body.map((u: any) => ({
      email: u.email,
      firstName: u.userFields?.firstName ?? '',
      lastName: u.userFields?.lastName ?? '',
      nickname: u.userFields?.nickname ?? '',
      phone: u.userFields?.phone ?? '',
      jerseyNumber: u.seasonFields?.jerseyNumber ?? '',
      pos: u.seasonFields?.pos ?? '',
      isGoalie: (u.seasonFields?.pos ?? '').toLowerCase() === 'goalie',
      isSub: u.seasonFields?.isSub ?? false,
    }));
  } catch {
    return [];
  }
}

// All-team roster: GET /teams/{teamId}/users
async function getTeamRoster(teamId: string): Promise<PlayerRow[]> {
  try {
    const res = await fetch(
      `${process.env.HOST}/teams/${teamId}/users`,
      { cache: 'no-store' }
    );
    const data = await res.json();
    if (data.status !== 200) return [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.body.map((u: any) => ({
      email: u.email,
      firstName: u.userFields?.firstName ?? '',
      lastName: u.userFields?.lastName ?? '',
      nickname: u.userFields?.nickname ?? '',
      phone: u.userFields?.phone ?? '',
      jerseyNumber: u.teamFields?.jerseyNumber ?? '',
      pos: u.teamFields?.pos ?? '',
      isGoalie: u.teamFields?.isGoalie ?? false,
      isSub: false,
    }));
  } catch {
    return [];
  }
}

async function getSeason(teamId: string, seasonId: string): Promise<{ title: string } | null> {
  try {
    const res = await fetch(`${process.env.HOST}/teams/${teamId}/seasons/${seasonId}`, {
      cache: 'no-store',
    });
    const data = await res.json();
    return data.status === 200 ? data.body : null;
  } catch {
    return null;
  }
}

function sortPlayers(players: PlayerRow[]): PlayerRow[] {
  const byNumber = (a: PlayerRow, b: PlayerRow) => {
    if (!a.jerseyNumber && !b.jerseyNumber) return 0;
    if (!a.jerseyNumber) return 1;
    if (!b.jerseyNumber) return -1;
    return parseInt(a.jerseyNumber) - parseInt(b.jerseyNumber);
  };
  const regular = players.filter((p) => !p.isSub).sort(byNumber);
  const subs = players.filter((p) => p.isSub).sort(byNumber);
  return [...regular, ...subs];
}

export default async function RosterPage({
  searchParams,
}: {
  searchParams: Promise<{ teamId?: string; seasonId?: string }>;
}) {
  const cookieStore = await cookies();
  if (!cookieStore.get('auth_token')?.value) {
    redirect('/login');
  }

  const { teamId, seasonId } = await searchParams;

  if (!teamId) {
    redirect('/admin');
  }

  const isSeasonRoster = !!seasonId;

  const [season, players] = await Promise.all([
    isSeasonRoster ? getSeason(teamId, seasonId) : Promise.resolve(null),
    isSeasonRoster ? getSeasonRoster(teamId, seasonId) : getTeamRoster(teamId),
  ]);

  const sorted = sortPlayers(players);
  const title = season?.title ?? 'All Players';

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-2xl space-y-8">

        {/* Back + Header */}
        <div className="space-y-1">
          <Link href="/admin" className="text-gray-500 hover:text-main text-sm transition-colors">
            ← Admin
          </Link>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="text-gray-500 text-sm">{players.length} players</p>
        </div>

        <PlayerList players={sorted} showGoalieFilter={!isSeasonRoster} />

      </div>
    </div>
  );
}
