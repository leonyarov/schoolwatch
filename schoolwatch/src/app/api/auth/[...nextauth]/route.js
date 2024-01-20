
import NextAuth, { getServerSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { getUser_credentials } from "../../actions";
import prisma from "../../../../../prisma/global"
import { PrismaAdapter } from "@auth/prisma-adapter";

export const config = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const user = await getUser_credentials(credentials.password)
                // console.log(user)
                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ],
    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60, // 30 days,
        strategy: "jwt",

    },
    jwt: {
        maxAge: 30 * 24 * 60 * 60, // 30 days,
    },
    // adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
    callbacks: {
        // async signIn({ user, account, profile, email, credentials }) {
        //     return true
        // },
        async jwt({ token, user }) {
            // console.log(token, account, profile, user)
            // console.log("--------------------------------------------------------------")
            // console.log("token: ", token, "user: ", user, "account: ", account, "profile: ", profile)
            // token.id = user.user_id
            if (user) token.user = user
            return token
        },
        async session({ session, token, user }) {
            // console.log("session invoked")
            // console.log(session, token, user)
            // console.log("session: ", session, "token: ", token, "user: ", user)
            // return { ...session, user }
            // session.user.data = token.user
            session.u = token.user
            // console.log(session)
            return session
        }
    },
    pages: {
        signIn: "/"

    }
}

const handler = NextAuth(config)

export function auth(...args) {
    return getServerSession(...args, config);
}
export { handler as GET, handler as POST }