// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      login: string;
      id: string;
      email: string;
      name: string;
      image: string;
    };
  }
}
