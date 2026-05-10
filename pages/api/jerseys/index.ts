import type { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '../../../lib/db';
import type { Jersey, NewJersey } from '../../../lib/data/jersey';

const PAGE_SIZE = 25;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = getDb();

  if (req.method === 'GET') {
    const { teamId, color, active, loaner, owesPayment, number, page } = req.query;
    if (!teamId || typeof teamId !== 'string') {
      return res.status(400).json({ error: 'teamId query param required' });
    }

    const pageNum = Math.max(1, parseInt(typeof page === 'string' ? page : '1', 10) || 1);
    const offset = (pageNum - 1) * PAGE_SIZE;

    const conditions: string[] = ['team_id = ?'];
    const params: unknown[] = [teamId];

    if (color && typeof color === 'string') {
      conditions.push('color = ?');
      params.push(color);
    }
    if (active === 'true') {
      conditions.push('is_active = TRUE');
    } else if (active === 'false') {
      conditions.push('is_active = FALSE');
    }
    if (loaner === 'true') {
      conditions.push('is_loaned = TRUE');
    } else if (loaner === 'false') {
      conditions.push('is_loaned = FALSE');
    }
    if (owesPayment === 'true') {
      conditions.push('owes_payment = TRUE');
    }
    if (number && typeof number === 'string') {
      conditions.push('number = ?');
      params.push(number);
    }

    const where = conditions.join(' AND ');

    try {
      const [[{ total }]] = await db.query(
        `SELECT COUNT(*) as total FROM team_user_jersey WHERE ${where}`,
        params
      ) as [[{ total: number }], unknown];

      const [rows] = await db.query(
        `SELECT * FROM team_user_jersey WHERE ${where} ORDER BY number+0, number LIMIT ? OFFSET ?`,
        [...params, PAGE_SIZE, offset]
      ) as [Jersey[], unknown];

      return res.status(200).json({ data: rows, total, page: pageNum, pageSize: PAGE_SIZE });
    } catch (err) {
      console.error('[jerseys GET]', err);
      return res.status(500).json({ error: 'Database error' });
    }
  }

  if (req.method === 'POST') {
    const body: NewJersey = req.body;
    const { team_user_id, team_id, user_id, email, size, number, color, name, is_loaned, is_active, owes_payment, amount_owed, jersey_type, purchase_date } = body;

    if (!team_user_id || !team_id || !user_id) {
      return res.status(400).json({ error: 'team_user_id, team_id, and user_id are required' });
    }

    try {
      await db.query(
        `INSERT INTO team_user_jersey (id, team_user_id, team_id, user_id, email, size, number, color, name, is_loaned, is_active, owes_payment, amount_owed, jersey_type, purchase_date)
         VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [team_user_id, team_id, user_id, email ?? null, size ?? null, number ?? null, color ?? null, name ?? null,
         is_loaned ?? false, is_active ?? true, owes_payment ?? false, amount_owed ?? null, jersey_type ?? null, purchase_date ?? null]
      );

      const [rows] = await db.query(
        `SELECT * FROM team_user_jersey WHERE team_user_id = ? AND team_id = ? ORDER BY created_at DESC LIMIT 1`,
        [team_user_id, team_id]
      ) as [Jersey[], unknown];
      return res.status(201).json(rows[0]);
    } catch (err) {
      const mysqlErr = err as { code?: string };
      if (mysqlErr.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
          error: `A ${color ?? 'jersey'} jersey already exists for ${email ?? 'this player'}. Each player can only have one jersey per color.`,
        });
      }
      console.error('[jerseys POST]', err);
      return res.status(500).json({ error: 'Database error' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
