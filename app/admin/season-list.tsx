'use client';

import { useState } from 'react';
import Link from 'next/link';

type Season = { title: string; seasonId: string; seasonStatus: number };

const STATUS_LABEL: Record<number, string> = {
  1: 'Active',
  2: 'Upcoming',
  [-1]: 'Inactive',
};

const STATUS_CLASS: Record<number, string> = {
  1: 'bg-main/15 text-main border-main/30',
  2: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  [-1]: 'bg-white/10 text-gray-500 border-white/15',
};

export default function SeasonList({
  activeSeasons,
  allSeasons,
  teamId,
}: {
  activeSeasons: Season[];
  allSeasons: Season[];
  teamId: string;
}) {
  const [showAll, setShowAll] = useState(false);
  const seasons = showAll ? allSeasons : activeSeasons;

  if (activeSeasons.length === 0 && allSeasons.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Current Season</h2>
        <button
          onClick={() => setShowAll((v) => !v)}
          className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 border border-white/15 hover:border-white/30 hover:text-white transition-colors"
        >
          {showAll ? 'Active only' : 'All seasons'}
        </button>
      </div>

      {seasons.length === 0 ? (
        <p className="text-gray-500 text-sm">No seasons found.</p>
      ) : (
        <div className="flex flex-col divide-y divide-white/10 border border-white/15 rounded-xl overflow-hidden">
          {seasons.map((season) => {
            const statusKey = Math.round(season.seasonStatus);
            return (
              <div
                key={season.seasonId}
                className="flex items-center justify-between px-5 py-4 bg-[#111] hover:bg-[#161616] transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-white text-sm font-medium truncate">{season.title}</span>
                  {showAll && (
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full border shrink-0 ${STATUS_CLASS[statusKey] ?? STATUS_CLASS[-1]}`}
                    >
                      {STATUS_LABEL[statusKey] ?? 'Unknown'}
                    </span>
                  )}
                </div>
                <Link
                  href={`/roster?teamId=${teamId}&seasonId=${season.seasonId}`}
                  className="text-main text-sm font-medium hover:opacity-75 transition-opacity shrink-0 ml-4"
                >
                  View Roster →
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
