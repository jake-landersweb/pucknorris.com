import type { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '../../../lib/db';
import type { Jersey, UpdateJersey } from '../../../lib/data/jersey';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = getDb();
  const { jerseyId } = req.query;

  if (!jerseyId || typeof jerseyId !== 'string') {
    return res.status(400).json({ error: 'jerseyId required' });
  }

  if (req.method === 'GET') {
    try {
      const result = await db.query<Jersey>(
        `SELECT * FROM team_user_jersey WHERE id = $1`,
        [jerseyId]
      );
      if (!result.rows[0]) return res.status(404).json({ error: 'Jersey not found' });
      return res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error('[jerseys/:id GET]', err);
      return res.status(500).json({ error: 'Database error' });
    }
  }

  if (req.method === 'PUT') {
    const body: UpdateJersey = req.body;
    const fields = ['team_user_id', 'user_id', 'size', 'number', 'color', 'name', 'is_loaned', 'is_paid', 'jersey_type'] as const;

    const setClauses: string[] = [];
    const values: unknown[] = [];
    let idx = 1;

    for (const field of fields) {
      if (field in body) {
        setClauses.push(`${field} = $${idx}`);
        values.push(body[field] ?? null);
        idx++;
      }
    }

    if (setClauses.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    setClauses.push(`updated_at = now()`);
    values.push(jerseyId);

    try {
      const result = await db.query<Jersey>(
        `UPDATE team_user_jersey SET ${setClauses.join(', ')} WHERE id = $${idx} RETURNING *`,
        values
      );
      if (!result.rows[0]) return res.status(404).json({ error: 'Jersey not found' });
      return res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error('[jerseys/:id PUT]', err);
      return res.status(500).json({ error: 'Database error' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const result = await db.query(
        `DELETE FROM team_user_jersey WHERE id = $1 RETURNING id`,
        [jerseyId]
      );
      if (!result.rows[0]) return res.status(404).json({ error: 'Jersey not found' });
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error('[jerseys/:id DELETE]', err);
      return res.status(500).json({ error: 'Database error' });
    }
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
