import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import fetchLoginUser from '../user/route'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || ''
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize (credentials, req) {
        const user = await fetchLoginUser(
          credentials?.username,
          credentials?.password
        )
        if (!user) throw new Error('Usuario no encontrado')
        return {
          id: user.id,
          name: user.username,
          email: user.email,
          token: user.access_token
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/'
  },
  secret: process.env.SECRET_KEY,
  session: {
    maxAge: 1 * 1 * 30 * 60 // 30 minutos,
  },
  callbacks: {
    async jwt ({ token, user }: any) {
      if (user) {
        token.accessToken = user.token
      }
      return token
    },
    async session ({ session, token }: any) {
      if (token) {
        session.user.accessToken = token.accessToken
      }
      return session
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
