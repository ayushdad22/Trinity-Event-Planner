import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    accountType?: string
    backendToken?: string
  }
  interface Session {
    user: {
      accountType?: string
      backendToken?: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accountType?: string
    backendToken?: string
  }
}