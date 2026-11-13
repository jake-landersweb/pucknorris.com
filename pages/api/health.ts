import type { NextApiRequest, NextApiResponse } from 'next';

// Liveness only: do not query external services or initialize database pools.
export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({ status: 'ok' });
}
