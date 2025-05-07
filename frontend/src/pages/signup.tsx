import { useState } from 'react';
import { signUp } from '../lib/cognito';
import { useRouter } from 'next/router';

export default function SignUp() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signUp(form.username, form.password, form.email);
      router.push(`/confirm?username=${encodeURIComponent(form.username)}`);
    } catch (e: any) {
      setError(e.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg w-80">
        <h2 className="text-2xl text-white mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          className="w-full mb-4 p-2 rounded"
          placeholder="Username"
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
        />
        <input
          className="w-full mb-4 p-2 rounded"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
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
          Create Account
        </button>
      </form>
    </div>
  );
}