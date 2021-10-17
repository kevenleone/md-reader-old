import NextAuth, { Session } from "next-auth";
import GithubProvider from "next-auth/providers/github";

import prisma from "@/lib/prisma";

export default NextAuth({
  callbacks: {
    async jwt({ account, profile, token }) {
      if (profile?.id) {
        token.githubId = profile.id;
        token.login = profile.login;
      }

      if (account?.access_token) {
        token.access_token = account.access_token;
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          access_token: token.access_token,
          id: token.githubId,
          login: token.login,
        },
      } as Session;
    },
    async signIn({ profile, user }) {
      const avatar_url = user.image;

      const id = profile.id as number;

      await prisma.user.upsert({
        create: {
          avatar_url,
          email: profile.email,
          id,
          login: profile.login as string,
          name: profile.name,
        },
        update: { avatar_url },
        where: {
          id,
        },
      });
      await prisma.$disconnect();

      return true;
    },
  },
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_APP_GITHUB_ID,
      clientSecret: process.env.NEXT_APP_GITHUB_SECRET,
    }),
  ],
});
