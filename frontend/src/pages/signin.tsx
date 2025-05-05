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
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg w-80">
        <h2 className="text-2xl text-white mb-6 text-center">Sign In</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          className="w-full mb-4 p-2 rounded"
          placeholder="Username"
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
        />
        <input
          className="w-full mb-6 p-2 rounded"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <button
          type="submit"
          className="w-full bg-red-600 py-2 rounded text-white hover:bg-red-700"
        >
          Sign In
        </button>
        <p className="mt-4 text-center text-sm text-gray-400">
  Don’t have an account?{' '}
  <Link
    href="/signup"
    className="text-white underline"
  >
    Sign up
  </Link>
</p>
      </form>
    </div>
  );
}