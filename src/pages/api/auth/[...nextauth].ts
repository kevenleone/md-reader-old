import NextAuth, { Session } from "next-auth";
import Providers from "next-auth/providers";

import supabase from "@/services/supabase";

export default NextAuth({
  callbacks: {
    async jwt(token, _user, _account, profile) {
      if (profile?.id) {
        token.githubId = profile.id;
      }

      return token;
    },
    async session(session, token) {
      return {
        ...session,
        user: { ...session.user, id: token.githubId },
      } as Session;
    },
    async signIn(_user, _account, profile) {
      const image = String(profile.picture).split("=").shift();
      const id = profile.id as string;

      return true;
    },
  },
  providers: [
    Providers.GitHub({
      clientId: process.env.NEXT_APP_GITHUB_ID,
      clientSecret: process.env.NEXT_APP_GITHUB_SECRET,
    }),
  ],
});
