import { withAuth } from 'next-auth/middleware';

export default withAuth({
  secret: process.env.SECRET_KEY,
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

// Const to excluide path that don't match with /:*path
export const config = {
  matcher: ['/learn/:path*', '/lesson/:path*', '/profile/:path*'],
};
