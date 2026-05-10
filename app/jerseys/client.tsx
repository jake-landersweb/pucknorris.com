'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import BoundsWrapper from '../../components/boundsWrapper';
import { getTeamJerseys, createJersey, updateJersey, deleteJersey } from '../../lib/apiRoutes/jerseys';
import type { JerseyFilters } from '../../lib/apiRoutes/jerseys';
import type { Jersey, NewJersey, UpdateJersey } from '../../lib/data/jersey';
import { JERSEY_SIZES, JERSEY_TYPES, JERSEY_COLORS } from '../../lib/data/jersey';

const DEFAULT_USER_ID = '18fb484d-f1ce-57d6-86fc-8608908cfb39';
const DEFAULT_TEAM_USER_ID = '71534f7a-c552-5f2a-bd4d-71d1ef438f1d';

const emptyForm: NewJersey = {
  team_user_id: DEFAULT_TEAM_USER_ID,
  team_id: '',
  user_id: DEFAULT_USER_ID,
  email: null,
  size: null,
  number: null,
  color: null,
  name: null,
  is_loaned: false,
  is_active: true,
  owes_payment: false,
  amount_owed: null,
  jersey_type: null,
  purchase_date: null,
};

function JerseyForm({
  teamId,
  initial,
  onSave,
  onCancel,
}: {
  teamId: string;
  initial?: Jersey;
  onSave: (data: NewJersey | UpdateJersey) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<NewJersey>(
    initial ? { ...initial } : { ...emptyForm, team_id: teamId }
  );

  const set = (key: keyof NewJersey, value: unknown) =>
    setForm((f) => ({ ...f, [key]: value }));

  return (
    <div className="bg-[#1a1a1a] border border-white/15 rounded-lg p-6 space-y-4">
      <h3 className="text-xl font-bold text-main">
        {initial ? 'Edit Jersey' : 'Add Jersey'}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1 text-sm text-gray-400">
          Name
          <input
            className="bg-black border border-white/15 rounded px-3 py-2 text-white"
            value={form.name ?? ''}
            onChange={(e) => set('name', e.target.value || null)}
            placeholder="Player name"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-gray-400">
          Email
          <input
            type="email"
            className="bg-black border border-white/15 rounded px-3 py-2 text-white"
            value={form.email ?? ''}
            onChange={(e) => set('email', e.target.value || null)}
            placeholder="player@example.com"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-gray-400">
          Number
          <input
            className="bg-black border border-white/15 rounded px-3 py-2 text-white"
            value={form.number ?? ''}
            onChange={(e) => set('number', e.target.value || null)}
            placeholder="e.g. 42"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-gray-400">
          Size
          <select
            className="bg-black border border-white/15 rounded px-3 py-2 text-white"
            value={form.size ?? ''}
            onChange={(e) => set('size', e.target.value || null)}
          >
            <option value="">— select —</option>
            {JERSEY_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm text-gray-400">
          Color
          <select
            className="bg-black border border-white/15 rounded px-3 py-2 text-white"
            value={form.color ?? ''}
            onChange={(e) => set('color', e.target.value || null)}
          >
            <option value="">— select —</option>
            {JERSEY_COLORS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm text-gray-400">
          Type
          <select
            className="bg-black border border-white/15 rounded px-3 py-2 text-white"
            value={form.jersey_type ?? ''}
            onChange={(e) => set('jersey_type', e.target.value || null)}
          >
            <option value="">— select —</option>
            {JERSEY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            className="accent-main w-4 h-4"
            checked={form.is_active ?? true}
            onChange={(e) => set('is_active', e.target.checked)}
          />
          Active Player
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            className="accent-main w-4 h-4"
            checked={form.is_loaned ?? false}
            onChange={(e) => set('is_loaned', e.target.checked)}
          />
          Loaner
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm text-gray-400">
        Purchase Date
        <input
          type="date"
          className="bg-black border border-white/15 rounded px-3 py-2 text-white w-48"
          value={form.purchase_date ?? ''}
          onChange={(e) => set('purchase_date', e.target.value || null)}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-gray-400">
        Amount Due ($)
        <input
          type="number"
          min="0"
          step="0.01"
          className="bg-black border border-white/15 rounded px-3 py-2 text-white w-40"
          value={form.amount_owed ?? ''}
          onChange={(e) => {
            const val = e.target.value ? parseFloat(e.target.value) : null;
            setForm((f) => ({ ...f, amount_owed: val, owes_payment: val != null && val > 0 }));
          }}
          placeholder="0.00"
        />
      </label>

      <div className="flex gap-3 pt-2">
        <button
          onClick={() => onSave(form)}
          className="bg-main text-black font-bold px-5 py-2 rounded hover:opacity-80 transition-opacity"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="border border-white/15 text-gray-400 px-5 py-2 rounded hover:text-white transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function JerseyRow({
  jersey,
  onEdit,
  onDelete,
}: {
  jersey: Jersey;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
      <td className="px-4 py-3 text-main font-bold text-lg">{jersey.number ?? '—'}</td>
      <td className="px-4 py-3 text-white">{jersey.name ?? '—'}</td>
      <td className="px-4 py-3 text-gray-400">{jersey.email ?? '—'}</td>
      <td className="px-4 py-3 text-gray-400 capitalize">{jersey.color ?? '—'}</td>
      <td className="px-4 py-3 text-gray-400">{jersey.size ?? '—'}</td>
      <td className="px-4 py-3 text-gray-400 capitalize">{jersey.jersey_type ?? '—'}</td>
      <td className="px-4 py-3">
        <span className={`text-xs px-2 py-1 rounded ${jersey.is_active ? 'bg-green-800/40 text-green-300' : 'bg-white/5 text-gray-500'}`}>
          {jersey.is_active ? 'Active' : 'Inactive'}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className={`text-xs px-2 py-1 rounded ${jersey.is_loaned ? 'bg-yellow-800/60 text-yellow-300' : 'bg-white/5 text-gray-500'}`}>
          {jersey.is_loaned ? 'Loaner' : 'Owned'}
        </span>
      </td>
      <td className="px-4 py-3 text-gray-400">
        {jersey.purchase_date ? new Date(jersey.purchase_date).toLocaleDateString('en-US', { timeZone: 'UTC' }) : '—'}
      </td>
      <td className="px-4 py-3">
        {jersey.amount_owed != null && jersey.amount_owed > 0 ? (
          <span className="text-red-400 font-medium">${Number(jersey.amount_owed).toFixed(2)}</span>
        ) : (
          <span className="text-gray-600">—</span>
        )}
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="text-sm text-gray-400 hover:text-main transition-colors underline"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-sm text-gray-400 hover:text-red-400 transition-colors underline"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function JerseysClient({ teamId }: { teamId: string }) {
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Jersey | null>(null);
  const [filters, setFilters] = useState<JerseyFilters>({ page: 1 });

  const queryKey = ['jerseys', teamId, filters];

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: () => getTeamJerseys(teamId, filters),
  });

  const jerseys = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / (data?.pageSize ?? 10));

  const setFilter = <K extends keyof JerseyFilters>(key: K, value: JerseyFilters[K]) =>
    setFilters((f) => ({ ...f, [key]: value, page: 1 }));

  const createMutation = useMutation({
    mutationFn: (d: NewJersey) => createJersey(d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['jerseys', teamId] }); setShowForm(false); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, d }: { id: string; d: UpdateJersey }) => updateJersey(id, d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['jerseys', teamId] }); setEditing(null); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteJersey(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['jerseys', teamId] }),
  });

  const handleSave = (d: NewJersey | UpdateJersey) => {
    if (editing) updateMutation.mutate({ id: editing.id, d });
    else createMutation.mutate(d as NewJersey);
  };

  return (
    <div>
      <div className="flex flex-col items-center pb-8 pt-4 text-center px-2">
        <h1 className="text-4xl font-bold text-white">Jersey Tracker</h1>
        <p className="text-gray-500 text-xl mt-2">Track jersey assignments for Puck Norris</p>
      </div>

      <BoundsWrapper>
        <div className="space-y-6">

          {/* Form */}
          {showForm || editing ? (
            <JerseyForm
              teamId={teamId}
              initial={editing ?? undefined}
              onSave={handleSave}
              onCancel={() => { setShowForm(false); setEditing(null); }}
            />
          ) : (
            <div className="flex justify-end">
              <button
                onClick={() => setShowForm(true)}
                className="bg-main text-black font-bold px-5 py-2 rounded hover:opacity-80 transition-opacity"
              >
                + Add Jersey
              </button>
            </div>
          )}

          {/* Mutation errors */}
          {(createMutation.error || updateMutation.error) && (
            <p className="text-red-400 text-sm bg-red-900/20 border border-red-800/40 rounded px-4 py-2">
              {(createMutation.error as Error)?.message ?? (updateMutation.error as Error)?.message}
            </p>
          )}

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3">
            <span className="text-gray-500 text-sm font-medium">Filter:</span>

            <select
              className="bg-black border border-white/15 rounded px-3 py-1.5 text-sm text-white"
              value={filters.color ?? ''}
              onChange={(e) => setFilter('color', e.target.value || undefined)}
            >
              <option value="">All Colors</option>
              {JERSEY_COLORS.map((c) => (
                <option key={c} value={c} className="capitalize">{c}</option>
              ))}
            </select>

            <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer select-none">
              <input
                type="checkbox"
                className="accent-main w-4 h-4"
                checked={filters.active === true}
                onChange={(e) => setFilter('active', e.target.checked ? true : undefined)}
              />
              Active players only
            </label>

            <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer select-none">
              <input
                type="checkbox"
                className="accent-main w-4 h-4"
                checked={filters.loaner === true}
                onChange={(e) => setFilter('loaner', e.target.checked ? true : undefined)}
              />
              Loaners only
            </label>

            <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer select-none">
              <input
                type="checkbox"
                className="accent-main w-4 h-4"
                checked={filters.owesPayment === true}
                onChange={(e) => setFilter('owesPayment', e.target.checked ? true : undefined)}
              />
              Amount due only
            </label>

            <input
              type="text"
              className="bg-black border border-white/15 rounded px-3 py-1.5 text-sm text-white w-28 placeholder-gray-600"
              placeholder="# lookup"
              value={filters.number ?? ''}
              onChange={(e) => setFilter('number', e.target.value || undefined)}
            />

            {(filters.color || filters.active !== undefined || filters.loaner !== undefined || filters.owesPayment !== undefined || filters.number) && (
              <button
                onClick={() => setFilters({ page: 1 })}
                className="text-xs text-gray-500 hover:text-white underline transition-colors"
              >
                Clear filters
              </button>
            )}

            <span className="ml-auto text-gray-500 text-sm">{total} jersey{total !== 1 ? 's' : ''}</span>
          </div>

          {/* Table */}
          {isLoading ? (
            <p className="text-gray-500">Loading jerseys…</p>
          ) : error ? (
            <p className="text-red-400">Failed to load jerseys.</p>
          ) : jerseys.length === 0 ? (
            <p className="text-gray-500 text-center py-12">No jerseys found.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-white/15">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/15 text-gray-500 text-left">
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Color</th>
                    <th className="px-4 py-3">Size</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Active</th>
                    <th className="px-4 py-3">Loaner</th>
                    <th className="px-4 py-3">Purchase Date</th>
                    <th className="px-4 py-3">Amount Due</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {jerseys.map((j) => (
                    <JerseyRow
                      key={j.id}
                      jersey={j}
                      onEdit={() => { setEditing(j); setShowForm(false); }}
                      onDelete={() => {
                        if (confirm(`Delete jersey #${j.number ?? j.id}?`)) {
                          deleteMutation.mutate(j.id);
                        }
                      }}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                disabled={filters.page === 1}
                onClick={() => setFilters((f) => ({ ...f, page: (f.page ?? 1) - 1 }))}
                className="px-3 py-1.5 rounded border border-white/15 text-sm text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ← Prev
              </button>
              <span className="text-gray-500 text-sm">
                Page {filters.page ?? 1} of {totalPages}
              </span>
              <button
                disabled={(filters.page ?? 1) >= totalPages}
                onClick={() => setFilters((f) => ({ ...f, page: (f.page ?? 1) + 1 }))}
                className="px-3 py-1.5 rounded border border-white/15 text-sm text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Next →
              </button>
            </div>
          )}

        </div>
      </BoundsWrapper>
    </div>
  );
}
