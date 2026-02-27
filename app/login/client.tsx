'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from '../../components/image';

export default function LoginClient() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Invalid email or password');
        return;
      }

      router.push('/admin');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">

        {/* Logo */}
        <div className="flex justify-center">
          <Image props={{
            src: '/images/pucknorris.png',
            alt: 'Puck Norris Logo',
            divClass: '',
            imgClass: 'h-[140px]',
          }} />
        </div>

        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-white">Sign in</h1>
          <p className="text-gray-500 text-sm">Puck Norris dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#111] border border-white/15 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-main transition-colors"
            />
            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#111] border border-white/15 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-main transition-colors"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-main text-black font-bold py-3 rounded-lg hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        {/* Links */}
        <div className="flex justify-between text-sm">
          <a
            href="https://teams.crosschecksports.com/ForgotPassword"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-main transition-colors"
          >
            Forgot password?
          </a>
          <a
            href="https://teams.crosschecksports.com/Register.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-main transition-colors"
          >
            Create account
          </a>
        </div>

      </div>
    </div>
  );
}
