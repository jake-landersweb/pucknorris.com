'use client';

import { useState } from 'react';

export type PlayerRow = {
  email: string;
  firstName: string;
  lastName: string;
  nickname: string;
  phone: string;
  jerseyNumber: string;
  pos: string;
  isGoalie: boolean;
  isSub: boolean;
};

function positionLabel(pos: string): string {
  if (!pos || pos === '--') return '';
  return pos.charAt(0).toUpperCase() + pos.slice(1).toLowerCase();
}

function PlayerRowUI({ player }: { player: PlayerRow }) {
  const { firstName, lastName, nickname, phone, email, jerseyNumber, isGoalie, isSub } = player;
  const displayName = `${firstName} ${lastName}`.trim() || nickname || email;
  const position = positionLabel(player.pos);

  return (
    <div className="flex items-center gap-4 px-5 py-4 bg-[#111] hover:bg-[#161616] transition-colors">
      <span className="w-10 text-center text-main font-bold text-sm shrink-0">
        {jerseyNumber ? `#${jerseyNumber}` : '—'}
      </span>
      <div className="flex-1 min-w-0 space-y-0.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-white text-sm font-medium truncate">{displayName}</span>
          {isGoalie && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-main/15 text-main border border-main/30 shrink-0">
              Goalie
            </span>
          )}
          {isSub && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/10 text-gray-400 border border-white/15 shrink-0">
              Sub
            </span>
          )}
        </div>
        {position && !isGoalie && (
          <span className="text-gray-500 text-xs block">{position}</span>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-0.5">
          <a href={`mailto:${email}`} className="text-gray-500 hover:text-main text-xs transition-colors">
            {email}
          </a>
          {phone && <span className="text-gray-500 text-xs">{phone}</span>}
        </div>
      </div>
    </div>
  );
}

function EmailList({ emails }: { emails: string[] }) {
  const [copied, setCopied] = useState(false);
  const emailText = emails.join(', ');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(emailText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Email List</h2>
        <button
          onClick={handleCopy}
          className="text-xs font-medium px-3 py-1.5 rounded-lg bg-main/15 text-main border border-main/30 hover:bg-main/25 transition-colors"
        >
          {copied ? 'Copied!' : 'Copy All'}
        </button>
      </div>
      <div className="bg-[#111] border border-white/15 rounded-xl px-5 py-4">
        <p className="text-gray-400 text-xs leading-relaxed break-all select-all">
          {emailText}
        </p>
      </div>
    </div>
  );
}

export default function PlayerList({
  players,
  showGoalieFilter,
}: {
  players: PlayerRow[];
  showGoalieFilter: boolean;
}) {
  const [goaliesOnly, setGoaliesOnly] = useState(false);
  const visible = goaliesOnly ? players.filter((p) => p.isGoalie) : players;
  const emails = visible.map((p) => p.email);

  return (
    <>
      <div className="space-y-3">
        {showGoalieFilter && (
          <div className="flex justify-end">
            <button
              onClick={() => setGoaliesOnly((v) => !v)}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
                goaliesOnly
                  ? 'bg-main/15 text-main border-main/30 hover:bg-main/25'
                  : 'bg-white/5 text-gray-400 border-white/15 hover:border-white/30 hover:text-white'
              }`}
            >
              {goaliesOnly ? 'All players' : 'Goalies only'}
            </button>
          </div>
        )}

        {visible.length > 0 ? (
          <div className="flex flex-col divide-y divide-white/10 border border-white/15 rounded-xl overflow-hidden">
            {visible.map((p) => (
              <PlayerRowUI key={p.email} player={p} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No players found.</p>
        )}
      </div>

      {emails.length > 0 && <EmailList emails={emails} />}
    </>
  );
}
