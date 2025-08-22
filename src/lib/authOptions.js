import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import dbConnect, { collectionNames } from "./dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials);

        const user = await loginUser(credentials);
        console.log(user);

        if (user) {
          return user;
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/signin",
  },
 callbacks: {
  async signIn({ user, account }) {
    if (!account) return true;

    const { providerAccountId, provider } = account;
    const { email, image, name } = user;

    const usersCollection = await dbConnect(collectionNames.USERS);

    const existingUser = await usersCollection.findOne({ providerAccountId });
    if (!existingUser) {
      const payload = {
        providerAccountId,
        provider,
        name,
        email,
        image,
      };
      await usersCollection.insertOne(payload);
    }

    return true;
  },
},

};
