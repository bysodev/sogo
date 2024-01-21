import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

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
            async authorize(credentials) {
                try {
                    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/user?username=${credentials?.username}&password=${credentials?.password}`, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            "Content-Type": "application/json",
                        },
                    });

                    if (response.status === 200) {
                        const user = await response.json();
                        return user;
                    } else {
                        const error = await response.json();
                        throw new Error(error.message);
                    }
                } catch (error) {
                    throw new Error('Credenciales incorrectas');
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
        maxAge: 30 * 60, // 30 minutos,
    },
    callbacks: {
        jwt: async ({ token, user }: any) => {
            if (user) {
                token.name = user.username
                token.accessToken = user.accessToken
            }
            return token
        },
        session: async ({ session, token }: any) => {
            if (token) {
                session.accessToken = token.accessToken
            }
            return session
        },
        signIn: async ({ user, account }: any) => {
            if (account.provider === 'google' || account.provider === 'github') {
                const { name, email, id } = user;
                const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/user/`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        "username": name,
                        "password": id,
                        "email": email
                    }),
                    headers: {
                        'Accept': 'application/json',
                        "Content-Type": "application/json",
                    },
                });

                const userData = await response.json();
                console.log(userData)
            }
            return true;
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

