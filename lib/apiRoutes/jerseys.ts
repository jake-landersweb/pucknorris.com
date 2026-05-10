import type { Jersey, NewJersey, UpdateJersey } from '../data/jersey';

export interface JerseyPage {
  data: Jersey[];
  total: number;
  page: number;
  pageSize: number;
}

export interface JerseyFilters {
  color?: string;
  active?: boolean;
  loaner?: boolean;
  owesPayment?: boolean;
  number?: string;
  page?: number;
}

export async function getTeamJerseys(teamId: string, filters: JerseyFilters = {}): Promise<JerseyPage> {
  const params = new URLSearchParams({ teamId });
  if (filters.color) params.set('color', filters.color);
  if (filters.active !== undefined) params.set('active', String(filters.active));
  if (filters.loaner !== undefined) params.set('loaner', String(filters.loaner));
  if (filters.owesPayment !== undefined) params.set('owesPayment', String(filters.owesPayment));
  if (filters.number) params.set('number', filters.number);
  if (filters.page) params.set('page', String(filters.page));
  const res = await fetch(`/api/jerseys?${params}`);
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
