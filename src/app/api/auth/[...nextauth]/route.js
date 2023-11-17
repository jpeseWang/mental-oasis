import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from '@/models/User'
import connect from '@/lib/db'
import bcrypt from 'bcryptjs'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      async authorize(credentials) {
        await connect()

        try {
          const user = await User.findOne({
            email: credentials.email,
          })

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password,
            )

            if (isPasswordCorrect) {
              return user
            } else {
              throw new Error('Tài khoản hoặc mật khẩu chưa đúng!')
            }
          } else {
            throw new Error('Không tìm thấy người dùng!')
          }
        } catch (err) {
          throw new Error(err)
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    error: '/auth/login',
  },
  callbacks: {
    jwt: ({ token, user, trigger }) => {
      if (user) {
        token.id = user.id
        token.fullname = user.fullname
        token.email = user.email
        token.avatar = user.avatar
        token.role = user.role
      }
      return token
    },
    session: ({ session, token, user }) => {
      if (token) {
        session.id = token.id
        session.fullname = token.fullname
        session.email = token.email
        session.avatar = token.avatar
        session.role = token.role
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }
