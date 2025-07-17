import NextAuth from 'next-auth'
import { NextRequest } from 'next/server'

const handler = NextAuth({
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
      clientId: process.env.REPLIT_CLIENT_ID!,
      clientSecret: process.env.REPLIT_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name || `${profile.first_name} ${profile.last_name}`.trim(),
          email: profile.email,
          image: profile.profile_image_url,
        }
      },
    },
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
})

export { handler as GET, handler as POST }