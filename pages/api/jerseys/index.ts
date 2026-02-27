import type { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '../../../lib/db';
import type { Jersey, NewJersey } from '../../../lib/data/jersey';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = getDb();

  if (req.method === 'GET') {
    const { teamId } = req.query;
    if (!teamId || typeof teamId !== 'string') {
      return res.status(400).json({ error: 'teamId query param required' });
    }

    try {
      const result = await db.query<Jersey>(
        `SELECT * FROM team_user_jersey WHERE team_id = $1 ORDER BY number`,
        [teamId]
      );
      return res.status(200).json(result.rows);
    } catch (err) {
      console.error('[jerseys GET]', err);
      return res.status(500).json({ error: 'Database error' });
    }
  }

  if (req.method === 'POST') {
    const body: NewJersey = req.body;
    const { team_user_id, team_id, user_id, size, number, color, name, is_loaned, is_paid, jersey_type } = body;

    if (!team_user_id || !team_id || !user_id) {
      return res.status(400).json({ error: 'team_user_id, team_id, and user_id are required' });
    }

    try {
      const result = await db.query<Jersey>(
        `INSERT INTO team_user_jersey
           (team_user_id, team_id, user_id, size, number, color, name, is_loaned, is_paid, jersey_type)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         RETURNING *`,
        [team_user_id, team_id, user_id, size ?? null, number ?? null, color ?? null, name ?? null,
         is_loaned ?? false, is_paid ?? false, jersey_type ?? null]
      );
      return res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('[jerseys POST]', err);
      return res.status(500).json({ error: 'Database error' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
