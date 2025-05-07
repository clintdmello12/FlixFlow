import { useState } from 'react';
import { signIn } from '../lib/cognito';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function SignIn() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signIn(form.username, form.password);
      router.push('/');
    } catch (e: any) {
      setError(e.message || 'Signin failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4 font-sans">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl shadow-xl w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-white text-center tracking-wide">Sign In</h2>

        {error && (
          <p className="text-red-500 text-center font-medium bg-red-900 bg-opacity-40 rounded p-2">
            {error}
          </p>
        )}

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter your username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 py-3 rounded font-semibold tracking-wide text-white shadow hover:bg-red-700 hover:scale-[1.01] transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Sign In
        </button>

        <p className="text-center text-sm text-gray-400 mt-4">
          Don’t have an account?{' '}
          <Link
            href="/signup"
            className="text-red-400 font-medium hover:underline hover:text-red-300 transition"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
