import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const response = await fetch(
      `${process.env.HOST}/users/${email}/login`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      }
    );

    const data = await response.json();

    if (!response.ok || data.status >= 400) {
      const errorMessages: Record<number, string> = {
        420: 'No account found with that email address.',
        430: 'Incorrect password.',
        440: 'Account not yet set up. Contact your team administrator.',
        410: 'Email and password are required.',
      };
      const status = data.status ?? response.status;
      return res.status(status).json({
        error: errorMessages[status] ?? data.message ?? 'Invalid email or password',
      });
    }

    const { mobileNotifications: _, notifications: __, ...user } = data.body;

    // Check if the user is a team manager via their team user record
    let isManager = false;
    try {
      const tuRes = await fetch(
        `${process.env.HOST}/teams/${process.env.TEAMID}/users/${user.email}/raw`
      );
      const tuData = await tuRes.json();
      if (tuData.status === 200) {
        isManager = (tuData.body?.teamUserType ?? 1) > 1;
      }
    } catch {
      // Default to non-manager if fetch fails
    }

    const maxAge = 60 * 60 * 24 * 30;
    const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
    const httpOnlyBase = `HttpOnly; Path=/; SameSite=Lax; Max-Age=${maxAge}${secure}`;
    const publicBase = `Path=/; SameSite=Lax; Max-Age=${maxAge}${secure}`;

    res.setHeader('Set-Cookie', [
      `auth_token=${encodeURIComponent(user.email)}; ${httpOnlyBase}`,
      `is_manager=${isManager ? '1' : '0'}; ${httpOnlyBase}`,
      `user_name=${encodeURIComponent(user.firstName ?? '')}; ${publicBase}`,
    ]);

    return res.status(200).json({ user });
  } catch (err) {
    console.error('[auth/login]', err);
    return res.status(500).json({ error: 'Login failed. Please try again.' });
  }
}
