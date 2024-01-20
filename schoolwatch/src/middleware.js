import { NextResponse } from 'next/server'
import { withAuth, NextRequestWithAuth } from 'next-auth/middleware'

// This function can be marked `async` if using `await` inside
// export function middleware(request) {
//     if (false)
//         return NextResponse.redirect(new URL('/dashboard/courses', request.url))

//     return NextResponse.next()
// }

export default withAuth(
    function middleware(req) {
        // console.log(req)
        var isAdmin = req.nextauth.token.user.role === "ADMIN"

        if (req.nextUrl.pathname.startsWith('/dashboard/users') && !isAdmin) {
            return NextResponse.rewrite(new URL('/dashboard', req.nextUrl))
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                // console.log(token)
                // return token?.user.role === "ADMIN"
                return !!token
            }

        }
    }
)

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/dashboard/:path*',
}