'use client';

import { signIn } from 'next-auth/react';
import { FormEvent, useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await signIn('email', { email, callbackUrl: '/' });
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm space-y-4 rounded border p-6"
      >
        <h1 className="text-xl font-semibold">Sign in</h1>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full rounded border px-3 py-2 text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded bg-black px-3 py-2 text-sm font-medium text-white"
        >
          Send magic link
        </button>
      </form>
    </main>
  );
}