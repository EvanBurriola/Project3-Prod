import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/lib/prisma"

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    secret: process.env.JWT_SECRET,
    callbacks: {
        // control whether user is actually in our database and
        // if they are (based on email) then make sure they are
        // a current employee. Add db properties to the user
        // before creating a JWT to restrict access to certain pages
        async signIn({user}) {
            const dbUser = await prisma.employees.findUnique({
                where: {
                    email: user.email,
                },
            })

            if (!dbUser || !dbUser.currentemployee) {
                return '/unauthorized'
            }

            user.role = dbUser.employeerole
            user.fullname = dbUser.employeename
            user.employeeid = dbUser.employeeid
            return true
        },
        // allow properties added in signIn to be found by the
        // session callback by adding to the JWT token
        // jwt() callback gets called everytime the session()
        // callback is called
        async jwt({token, user}) {
            // user is only available once on initial signin
            if (user) {
                token.role = user.role
                token.fullname = user.fullname
                token.employeeid = user.employeeid
            }
            return token
        },
        // make properties we added during signIn available to client
        // when using getSession or useSession hook
        async session({session, token}) {
            session.user.role = token.role
            session.user.fullname = token.fullname
            session.user.employeeid = token.employeeid
            return session
        }
    }
}

export default NextAuth(authOptions)