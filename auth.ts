import NextAuth from "next-auth"
import Github from "next-auth/providers/github"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Github({
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  })],
})