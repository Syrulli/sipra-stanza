import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/app/lib/mongoose";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectDB();
        const user = await User.findOne({ email: credentials.email.toLowerCase() });
        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role || "customer",
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  pages: {
    signIn: "/signin",
    error: "/signin",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      if (token.email && !token.role) {
        await connectDB();
        const dbUser = await User.findOne({ email: token.email });
        if (dbUser) token.role = dbUser.role || "customer";
      }

      return token;
    },

    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string;
      }
      if (token?.role) {
        session.user.role = token.role as string;
      }
      return session;
    },

    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await connectDB();
        const existing = await User.findOne({ email: user.email });

        if (!existing) {
          await User.create({
            name: user.name,
            email: user.email?.toLowerCase(),
            image: user.image,
            role: "customer",
          });
        }
      }
      return true;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/dashboard`;
      }
      return url;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };