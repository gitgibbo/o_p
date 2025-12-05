/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/server/db/client';
import EmailProvider from 'next-auth/providers/email';

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'database' as const,
  },
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST!,
        port: Number(process.env.EMAIL_SERVER_PORT!),
        auth: {
          user: process.env.EMAIL_SERVER_USER!,
          pass: process.env.EMAIL_SERVER_PASSWORD!,
        },
      },
      from: process.env.EMAIL_FROM!,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // Explicitly type the args so TS stops whinging
    async session({
      session,
      user,
    }: {
      session: any;
      user: any;
    }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};