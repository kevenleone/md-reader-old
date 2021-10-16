import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_APP_GITHUB_ID,
      clientSecret: process.env.NEXT_APP_GITHUB_SECRET,
    }),
  ],
});
