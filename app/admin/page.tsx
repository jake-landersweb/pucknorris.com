import Link from 'next/link';
import { cookies } from 'next/headers';
import Image from '../../components/image';
import SeasonList from './season-list';

const tools = (teamId: string) => [
  {
    href: '/jerseys',
    title: 'Jerseys',
    cta: 'Open Jerseys',
    description: 'Track jersey assignments, sizes, numbers, and payment status for the team.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8 text-main">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5H6.375A2.625 2.625 0 003.75 7.125v11.25A2.625 2.625 0 006.375 21h11.25a2.625 2.625 0 002.625-2.625V7.125A2.625 2.625 0 0017.625 4.5H15M9 4.5V3m0 1.5a3 3 0 006 0M15 4.5V3" />
      </svg>
    ),
  },
  {
    href: `/roster?teamId=${teamId}`,
    title: 'Entire Team Roster',
    cta: 'View all Players',
    description: 'View all Puck Norris players across all seasons.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8 text-main">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
];

type Season = { title: string; seasonId: string; seasonStatus: number; created: string };

async function getActiveSeasons(): Promise<Season[]> {
  try {
    const res = await fetch(
      `${process.env.HOST}/teams/${process.env.TEAMID}/activeSeasons`,
      { cache: 'no-store' }
    );
    const data = await res.json();
    return data.status === 200 ? data.body ?? [] : [];
  } catch {
    return [];
  }
}

async function getAllSeasons(): Promise<Season[]> {
  try {
    const res = await fetch(
      `${process.env.HOST}/teams/${process.env.TEAMID}/seasons`,
      { cache: 'no-store' }
    );
    const data = await res.json();
    if (data.status !== 200) return [];
    const seasons: Season[] = data.body ?? [];
    return seasons.sort((a, b) => (b.created ?? '').localeCompare(a.created ?? ''));
  } catch {
    return [];
  }
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isLoggedIn = !!cookieStore.get('auth_token')?.value;
  const isManager = cookieStore.get('is_manager')?.value === '1';

  const [activeSeasons, allSeasons] = isLoggedIn
    ? await Promise.all([getActiveSeasons(), getAllSeasons()])
    : [[], []];

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-16">
      <div className="w-full max-w-2xl space-y-10">

        {/* Header */}
        <div className="flex flex-col items-center space-y-4">
          <Image props={{
            src: '/images/pucknorris.png',
            alt: 'Puck Norris Logo',
            divClass: '',
            imgClass: 'h-[120px]',
          }} />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white font-gains">Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Puck Norris dashboard</p>
          </div>
        </div>

        {/* Tool cards — managers only */}
        {isManager && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tools(process.env.TEAMID!).map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex flex-col gap-4 bg-[#111] border border-white/15 rounded-xl p-6 hover:border-main/50 hover:bg-[#161616] transition-all"
              >
                <div className="flex items-center gap-3">
                  {tool.icon}
                  <h2 className="text-lg font-bold text-white group-hover:text-main transition-colors">
                    {tool.title}
                  </h2>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{tool.description}</p>
                <span className="text-main text-sm font-medium mt-auto">
                  {tool.cta} →
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* Seasons */}
        {isLoggedIn && (
          <SeasonList
            activeSeasons={activeSeasons}
            allSeasons={allSeasons}
            teamId={process.env.TEAMID!}
          />
        )}

      </div>
    </div>
  );
}
