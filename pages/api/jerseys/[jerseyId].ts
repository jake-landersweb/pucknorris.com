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
      const [rows] = await db.query(
        `SELECT * FROM team_user_jersey WHERE id = ?`,
        [jerseyId]
      ) as [Jersey[], unknown];
      if (!rows[0]) return res.status(404).json({ error: 'Jersey not found' });
      return res.status(200).json(rows[0]);
    } catch (err) {
      console.error('[jerseys/:id GET]', err);
      return res.status(500).json({ error: 'Database error' });
    }
  }

  if (req.method === 'PUT') {
    const body: UpdateJersey = req.body;
    const fields = ['team_user_id', 'user_id', 'email', 'size', 'number', 'color', 'name', 'is_loaned', 'is_active', 'owes_payment', 'amount_owed', 'jersey_type', 'purchase_date'] as const;

    const setClauses: string[] = [];
    const values: unknown[] = [];

    for (const field of fields) {
      if (field in body) {
        setClauses.push(`${field} = ?`);
        values.push(body[field] ?? null);
      }
    }

    if (setClauses.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    setClauses.push(`updated_at = NOW()`);
    values.push(jerseyId);

    try {
      await db.query(
        `UPDATE team_user_jersey SET ${setClauses.join(', ')} WHERE id = ?`,
        values
      );
      const [rows] = await db.query(
        `SELECT * FROM team_user_jersey WHERE id = ?`,
        [jerseyId]
      ) as [Jersey[], unknown];
      if (!rows[0]) return res.status(404).json({ error: 'Jersey not found' });
      return res.status(200).json(rows[0]);
    } catch (err) {
      console.error('[jerseys/:id PUT]', err);
      return res.status(500).json({ error: 'Database error' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const [rows] = await db.query(
        `SELECT id FROM team_user_jersey WHERE id = ?`,
        [jerseyId]
      ) as [{ id: string }[], unknown];
      if (!rows[0]) return res.status(404).json({ error: 'Jersey not found' });
      await db.query(`DELETE FROM team_user_jersey WHERE id = ?`, [jerseyId]);
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error('[jerseys/:id DELETE]', err);
      return res.status(500).json({ error: 'Database error' });
    }
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
