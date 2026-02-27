import type { Jersey, NewJersey, UpdateJersey } from '../data/jersey';

// Client-side fetch functions called by React Query
// These hit the Next.js API routes which talk to Postgres

export async function getTeamJerseys(teamId: string): Promise<Jersey[]> {
  const res = await fetch(`/api/jerseys?teamId=${encodeURIComponent(teamId)}`);
  if (!res.ok) throw new Error('Failed to fetch jerseys');
  return res.json();
}

export async function getJersey(jerseyId: string): Promise<Jersey> {
  const res = await fetch(`/api/jerseys/${jerseyId}`);
  if (!res.ok) throw new Error('Failed to fetch jersey');
  return res.json();
}

export async function createJersey(jersey: NewJersey): Promise<Jersey> {
  const res = await fetch('/api/jerseys', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jersey),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? 'Failed to create jersey');
  }
  return res.json();
}

export async function updateJersey(jerseyId: string, jersey: UpdateJersey): Promise<Jersey> {
  const res = await fetch(`/api/jerseys/${jerseyId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jersey),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? 'Failed to update jersey');
  }
  return res.json();
}

export async function deleteJersey(jerseyId: string): Promise<void> {
  const res = await fetch(`/api/jerseys/${jerseyId}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete jersey');
}
