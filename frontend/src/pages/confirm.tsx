// src/pages/confirm.tsx
import { useState } from 'react';
import { useRouter }   from 'next/router';
import { confirmSignUp, resendConfirmationCode } from '../lib/cognito';

export default function Confirm() {
  const router = useRouter();
  const { username } = router.query;      // you’ll redirect here with ?username=…
  const [code, setCode]     = useState('');
  const [error, setError]   = useState<string>();
  const [message, setMsg]   = useState<string>();

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);
    try {
      await confirmSignUp(username as string, code);
      router.push('/signin');
    } catch (err: any) {
      setError(err.message || 'Confirmation failed');
    }
  };

  const handleResend = async () => {
    try {
      await resendConfirmationCode(username as string);
      setMsg('Code resent! Check your email.');
    } catch {
      setError('Could not resend code');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleConfirm} className="bg-gray-800 p-8 rounded-lg w-80">
        <h2 className="text-2xl text-white mb-6 text-center">
          Confirm Your Account
        </h2>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        {message && <p className="text-green-400 mb-4">{message}</p>}
        <input
          className="w-full mb-4 p-2 rounded"
          placeholder="Verification Code"
          value={code}
          onChange={e => setCode(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-red-600 py-2 rounded text-white hover:bg-red-700 mb-2"
        >
          Confirm
        </button>
        <button
          type="button"
          onClick={handleResend}
          className="w-full text-sm text-gray-300 underline"
        >
          Resend Code
        </button>
      </form>
    </div>
  );
}
