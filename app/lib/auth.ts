import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "replit",
      name: "Replit",
      type: "oauth",
      authorization: {
        url: "https://replit.com/oidc/auth",
        params: {
          scope: "openid email profile offline_access",
          response_type: "code",
        },
      },
      token: "https://replit.com/oidc/token",
      userinfo: "https://replit.com/oidc/userinfo",
      clientId: process.env.REPL_ID,
      clientSecret: process.env.REPLIT_SECRET,
      checks: ["pkce", "state"],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.first_name || profile.last_name ? 
            `${profile.first_name || ''} ${profile.last_name || ''}`.trim() : 
            profile.email,
          email: profile.email,
          image: profile.profile_image_url,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.id = profile.sub;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  session: {
    strategy: "jwt",
  },
};