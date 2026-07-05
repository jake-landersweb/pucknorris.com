import type { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '../../lib/db';

const TEAM_USER_ID = '71534f7a-c552-5f2a-bd4d-71d1ef438f1d';
const USER_ID = '18fb484d-f1ce-57d6-86fc-8608908cfb39';
const PURCHASE_DATE = '2026-05-10';

const jerseys = [
  // Black
  { name: 'Anthony Holguin',  email: null,                        color: 'black',  size: 'L',   number: '85', is_loaned: false, owes_payment: true,  amount_owed: 45 },
  { name: 'Barry Fifth-Lince',email: null,                        color: 'black',  size: 'XL',  number: '9',  is_loaned: false, owes_payment: true,  amount_owed: 45 },
  { name: 'Ilya Sofinskiy',   email: null,                        color: 'black',  size: 'XXL', number: '86', is_loaned: false, owes_payment: true,  amount_owed: 45 },
  { name: 'Jeffrey Rivers',   email: null,                        color: 'black',  size: 'L',   number: '2',  is_loaned: false, owes_payment: true,  amount_owed: 45 },
  { name: 'Kevin Eike',       email: null,                        color: 'black',  size: 'XXL', number: '42', is_loaned: false, owes_payment: true,  amount_owed: 45 },
  { name: 'Tyler Reed',       email: null,                        color: 'black',  size: 'L',   number: '20', is_loaned: false, owes_payment: true,  amount_owed: 45 },
  { name: 'Matt Elenberger',  email: null,                        color: 'black',  size: 'XL',  number: '18', is_loaned: false, owes_payment: true,  amount_owed: 45 },
  { name: 'Nick Nixon',       email: null,                        color: 'black',  size: 'XL',  number: '25', is_loaned: false, owes_payment: true,  amount_owed: 45 },
  { name: 'Patrick Bartshe',  email: null,                        color: 'black',  size: 'G',   number: '72', is_loaned: false, owes_payment: true,  amount_owed: 45 },
  { name: 'Tyler Harrington', email: null,                        color: 'black',  size: 'L',   number: '7',  is_loaned: false, owes_payment: true,  amount_owed: 45 },
  { name: 'Kyle Pisano',      email: null,                        color: 'black',  size: 'G',   number: '1',  is_loaned: false, owes_payment: true,  amount_owed: 45 },
  { name: 'Jeff Larson',      email: null,                        color: 'black',  size: 'XXL', number: '33', is_loaned: false, owes_payment: true,  amount_owed: 45 },
  { name: 'Jeff McGowan',     email: null,                        color: 'black',  size: 'XXL', number: '21', is_loaned: false, owes_payment: true,  amount_owed: 45 },
  { name: null,               email: null,                        color: 'black',  size: 'XXL', number: '76', is_loaned: true,  owes_payment: false, amount_owed: null },
  { name: null,               email: null,                        color: 'black',  size: 'XXL', number: '15', is_loaned: true,  owes_payment: false, amount_owed: null },
  // White
  { name: 'Barry Fifth-Lince',email: null,                        color: 'white',  size: 'XL',  number: '9',  is_loaned: false, owes_payment: true,  amount_owed: 45 },
  { name: 'Jeffrey Rivers',   email: null,                        color: 'white',  size: 'L',   number: '2',  is_loaned: false, owes_payment: true,  amount_owed: 45 },
  { name: 'Nick Nixon',       email: null,                        color: 'white',  size: 'XL',  number: '25', is_loaned: false, owes_payment: true,  amount_owed: 45 },
  { name: 'Sam Laubenthal',   email: null,                        color: 'white',  size: 'L',   number: '14', is_loaned: false, owes_payment: true,  amount_owed: 45 },
  { name: 'Sam Whitney',      email: null,                        color: 'white',  size: 'L',   number: '17', is_loaned: false, owes_payment: true,  amount_owed: 45 },
  { name: 'Dillon Gentry',    email: null,                        color: 'white',  size: 'XL',  number: '37', is_loaned: false, owes_payment: true,  amount_owed: 45 },
  { name: 'Geoff Hohn',       email: 'geoff.wv@gmail.com',        color: 'white',  size: 'XL',  number: '63', is_loaned: true,  owes_payment: false, amount_owed: null },
  { name: 'Travis Farrell',   email: 'travismfarrell@gmail.com',  color: 'white',  size: 'XL',  number: '69', is_loaned: true,  owes_payment: false, amount_owed: null },
  { name: 'Tyler Harrington', email: null,                        color: 'white',  size: 'L',   number: '7',  is_loaned: false, owes_payment: true,  amount_owed: 45 },
  { name: 'Kyle Pisano',      email: null,                        color: 'white',  size: 'G',   number: '1',  is_loaned: false, owes_payment: true,  amount_owed: 45 },
  { name: null,               email: null,                        color: 'white',  size: 'L',   number: '53', is_loaned: true,  owes_payment: false, amount_owed: null },
  { name: null,               email: null,                        color: 'white',  size: 'L',   number: '41', is_loaned: true,  owes_payment: false, amount_owed: null },
  { name: null,               email: null,                        color: 'white',  size: 'XXL', number: '76', is_loaned: true,  owes_payment: false, amount_owed: null },
  // Yellow
  { name: 'Nick Nixon',       email: null,                        color: 'yellow', size: 'XL',  number: '25', is_loaned: false, owes_payment: true,  amount_owed: 45 },
  { name: 'Forty Four',       email: 'flyin_j44@hotmail.com',     color: 'yellow', size: 'XL',  number: '4',  is_loaned: false, owes_payment: true,  amount_owed: 45 },
  { name: null,               email: null,                        color: 'yellow', size: 'XL',  number: '69', is_loaned: true,  owes_payment: false, amount_owed: null },
  { name: null,               email: null,                        color: 'yellow', size: 'XXL', number: '15', is_loaned: true,  owes_payment: false, amount_owed: null },
  { name: null,               email: null,                        color: 'yellow', size: 'L',   number: '7',  is_loaned: true,  owes_payment: false, amount_owed: null },
  { name: null,               email: null,                        color: 'yellow', size: 'L',   number: '53', is_loaned: true,  owes_payment: false, amount_owed: null },
  { name: null,               email: null,                        color: 'yellow', size: 'L',   number: '2',  is_loaned: true,  owes_payment: false, amount_owed: null },
  { name: null,               email: null,                        color: 'yellow', size: 'L',   number: '41', is_loaned: true,  owes_payment: false, amount_owed: null },
  { name: null,               email: null,                        color: 'yellow', size: 'XXL', number: '76', is_loaned: true,  owes_payment: false, amount_owed: null },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const teamId = process.env.TEAMID;
  if (!teamId) {
    return res.status(500).json({ error: 'TEAMID env var not set' });
  }

  const db = getDb();
  const results: { jersey: string; success: boolean; error?: string }[] = [];

  for (const j of jerseys) {
    const label = `${j.color} #${j.number} ${j.name ?? 'Sub'}`;
    try {
      await db.query(
        `INSERT INTO team_user_jersey
           (id, team_user_id, team_id, user_id, email, size, number, color, name, is_loaned, is_active, owes_payment, amount_owed, purchase_date)
         VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?, ?, TRUE, ?, ?, ?)`,
        [TEAM_USER_ID, teamId, USER_ID, j.email, j.size, j.number, j.color, j.name,
         j.is_loaned, j.owes_payment, j.amount_owed ?? null, PURCHASE_DATE]
      );
      results.push({ jersey: label, success: true });
    } catch (err) {
      results.push({ jersey: label, success: false, error: (err as Error).message });
    }
  }

  const succeeded = results.filter((r) => r.success).length;
  const failed = results.filter((r) => !r.success);

  return res.status(200).json({ total: jerseys.length, succeeded, failed, results });
}
