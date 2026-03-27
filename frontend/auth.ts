import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { users } from "@/lib/users-store"
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const user = users.find(
          (u) =>
            u.email === credentials.email &&
            u.password === credentials.password
        )
        if (!user) return null
        return {
          name: user.name,
          email: user.email,
          accountType: user.accountType,
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.accountType = (user as any).accountType
      }
      return token
    },
    session({ session, token }) {
      session.user.accountType = token.accountType as string
      return session
    },
  },
})