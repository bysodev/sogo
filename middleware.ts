import { withAuth } from 'next-auth/middleware';

export default withAuth({
  secret: process.env.SECRET_KEY,
})

export const config = {
  matcher: ['/learn/:path*', '/lesson/:path*'],
}
