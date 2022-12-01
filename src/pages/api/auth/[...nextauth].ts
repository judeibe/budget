import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";

import { env } from "../../../env/server.mjs";
import Firefly from "./providers/firefly";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, token }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
          session.user.email = token.email;
        }
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  providers: [
    Firefly({
      clientId: env.FIREFLY_CLIENT_ID,
      clientSecret: env.FIREFLY_CLIENT_SECRET,
      serverUrl: env.FIREFLY_SERVER_URL,
    }),
  ],
};



export default NextAuth(authOptions);
