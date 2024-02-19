import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const response = await fetch(
          `${process.env.NEXTAUTH_URL}/api/auth/user?username=${credentials?.username}&password=${credentials?.password}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );
        if (response.status === 501) {
          throw new Error('Error al procesar la solicitud');
        }
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.detail);
        }
        return data;
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/login',
  },
  secret: process.env.SECRET_KEY,
  session: {
    maxAge: 30 * 60, // 30 minutos,
    rollingSession: false,
  },
  callbacks: {
    jwt: async ({ token, user, trigger, session }: any) => {
      if (trigger === "update") {
        // Here you can update the name and the token
        token.name = session.user.name;
        token.image = session.user.image;
        token.accessToken = session.user.accessToken;
        return token;
      }
      if (user) {
        token.name = user.username;
        token.image = user.image;
        token.accessToken = user.accessToken;
      }

      // Check if the token is about to expire
      if (token.expires && Date.now() > token.expires - 30000) {
        const res = await fetch('/refreshToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: token.name,
            email: token.email
          })
        });

        if (res.ok) {
          const data = await res.json();
          token = {
            ...token,
            ...data,
            expires: Date.now() + data.expires_in * 1000
          };
        }
      }

      return token;
    },
    session: async ({ session, token }: any) => {
      if (token) {
        // Aquí puedes actualizar el nombre y el token
        session.user.name = token.name;
        session.user.image = token.image;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
    signIn: async ({ user, account }: any) => {
      if (account.provider === 'google' || account.provider === 'github') {
        console.log(user, account)
        const { name, email, id, image } = user;
        const response = await fetch(
          `${process.env.NEXTAUTH_URL}/api/auth/user/provider`,
          {
            method: 'POST',
            body: JSON.stringify({
              username: name,
              password: id,
              email: email,
              image: image,
              provider: account.provider,
            }),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );
        const userData = await response.json();
        if (response.status === 201) {
          user.accessToken = userData.accessToken;
          return true;
        }
      } else if (account.provider === 'credentials') {
        if (user) {
          return true;
        }
      }
      return false;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions as config };

