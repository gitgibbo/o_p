import { getServerSession } from 'next-auth';
import { authConfig } from '@/server/auth/config';
import Link from 'next/link';

export default async function HomePage() {
  const session = await getServerSession(authConfig);

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <Link
          href="/login"
          className="rounded border px-4 py-2 text-sm font-medium"
        >
          Go to login
        </Link>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <p className="text-lg">Signed in as {session.user.email}</p>
      <form action="/api/auth/signout" method="post">
        <button
          type="submit"
          className="rounded border px-4 py-2 text-sm font-medium"
        >
          Sign out
        </button>
      </form>
    </main>
  );
}