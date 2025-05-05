import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getCurrentSession, signOut } from '../lib/cognito';

export default function Profile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getCurrentSession().then(s => {
      if (!s) return router.replace('/signin');
      setUser(s.getIdToken().payload);
      setLoading(false);
    });
  }, [router]);

  if (loading) return <p>Loading profile…</p>;

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-2xl mb-4">Your Profile</h2>
      <p><strong>Username:</strong> {user['cognito:username']}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <div className="mt-6 space-x-4">
        <Link href="/" className="underline">← Home</Link>
        <button onClick={() => { signOut(); router.push('/signin'); }} className="bg-red-600 px-3 py-1 rounded">Sign Out</button>
      </div>
    </div>
  );
}