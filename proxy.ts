export { auth as proxy } from '@/auth'

export const config = {
  matcher: ['/quiz/:path*', '/api/quiz/:path*', '/api/leaderboard/:path*', '/api/user/:path*'],
}
