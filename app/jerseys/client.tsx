'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import BoundsWrapper from '../../components/boundsWrapper';
import PageHeader from '../../components/pageHeader';
import { getTeamJerseys, createJersey, updateJersey, deleteJersey } from '../../lib/apiRoutes/jerseys';
import type { Jersey, NewJersey, UpdateJersey } from '../../lib/data/jersey';
import { JERSEY_SIZES, JERSEY_TYPES, JERSEY_COLORS } from '../../lib/data/jersey';

// Hardcoded for testing — replace when user context is wired up
const DEFAULT_USER_ID = '18fb484d-f1ce-57d6-86fc-8608908cfb39';
const DEFAULT_TEAM_USER_ID = '71534f7a-c552-5f2a-bd4d-71d1ef438f1d';

const emptyForm: NewJersey = {
  team_user_id: DEFAULT_TEAM_USER_ID,
  team_id: '',
  user_id: DEFAULT_USER_ID,
  size: null,
  number: null,
  color: null,
  name: null,
  is_loaned: false,
  is_paid: false,
  jersey_type: null,
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
    initial
      ? { ...initial }
      : { ...emptyForm, team_id: teamId }
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

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            className="accent-main w-4 h-4"
            checked={form.is_loaned ?? false}
            onChange={(e) => set('is_loaned', e.target.checked)}
          />
          Loaner
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            className="accent-main w-4 h-4"
            checked={form.is_paid ?? false}
            onChange={(e) => set('is_paid', e.target.checked)}
          />
          Paid
        </label>
      </div>

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
      <td className="px-4 py-3 text-gray-400 capitalize">{jersey.color ?? '—'}</td>
      <td className="px-4 py-3 text-gray-400">{jersey.size ?? '—'}</td>
      <td className="px-4 py-3 text-gray-400 capitalize">{jersey.jersey_type ?? '—'}</td>
      <td className="px-4 py-3">
        <span className={`text-xs px-2 py-1 rounded ${jersey.is_loaned ? 'bg-yellow-800/60 text-yellow-300' : 'bg-white/5 text-gray-500'}`}>
          {jersey.is_loaned ? 'Loaner' : 'Owned'}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className={`text-xs px-2 py-1 rounded ${jersey.is_paid ? 'bg-green-800/60 text-green-300' : 'bg-red-900/40 text-red-400'}`}>
          {jersey.is_paid ? 'Paid' : 'Unpaid'}
        </span>
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

  const { data: jerseys = [], isLoading, error } = useQuery({
    queryKey: ['jerseys', teamId],
    queryFn: () => getTeamJerseys(teamId),
  });

  const createMutation = useMutation({
    mutationFn: (data: NewJersey) => createJersey(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['jerseys', teamId] });
      setShowForm(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateJersey }) => updateJersey(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['jerseys', teamId] });
      setEditing(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteJersey(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['jerseys', teamId] }),
  });

  const handleSave = (data: NewJersey | UpdateJersey) => {
    if (editing) {
      updateMutation.mutate({ id: editing.id, data });
    } else {
      createMutation.mutate(data as NewJersey);
    }
  };

  return (
    <div>
      <PageHeader>
        <h1 className="text-4xl font-bold text-white">Jersey Tracker</h1>
        <p className="text-gray-500 text-xl">Track jersey assignments for Puck Norris</p>
      </PageHeader>

      <BoundsWrapper>
        <div className="space-y-6">
          {/* Add / form area */}
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
            <p className="text-red-400 text-sm">
              {(createMutation.error as Error)?.message ?? (updateMutation.error as Error)?.message}
            </p>
          )}

          {/* Table */}
          {isLoading ? (
            <p className="text-gray-500">Loading jerseys…</p>
          ) : error ? (
            <p className="text-red-400">Failed to load jerseys.</p>
          ) : jerseys.length === 0 ? (
            <p className="text-gray-500 text-center py-12">No jerseys recorded yet.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-white/15">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/15 text-gray-500 text-left">
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Color</th>
                    <th className="px-4 py-3">Size</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Loaner</th>
                    <th className="px-4 py-3">Paid</th>
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
        </div>
      </BoundsWrapper>
    </div>
  );
}
