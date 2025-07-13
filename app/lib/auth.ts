import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "replit",
      name: "Replit",
      type: "oauth",
      authorization: {
        url: "https://replit.com/oidc/authorize",
        params: {
          scope: "openid email profile offline_access",
          response_type: "code",
          prompt: "login consent",
        },
      },
      token: "https://replit.com/oidc/token",
      userinfo: "https://replit.com/oidc/userinfo",
      clientId: process.env.REPL_ID || '',
      clientSecret: process.env.REPL_ID || '', // Replit uses REPL_ID for both
      checks: ["pkce", "state"],
      profile(profile: any) {
        return {
          id: profile.sub,
          name: profile.first_name || profile.last_name ? 
            `${profile.first_name || ''} ${profile.last_name || ''}`.trim() : 
            profile.email,
          email: profile.email,
          image: profile.profile_image_url,
          firstName: profile.first_name,
          lastName: profile.last_name,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, account, profile }: any) {
      if (account && profile) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.id = profile.sub;
        token.firstName = profile.first_name;
        token.lastName = profile.last_name;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.accessToken = token.accessToken;
        session.user.id = token.id as string;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 giorni
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.SESSION_SECRET,
};