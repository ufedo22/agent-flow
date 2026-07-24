// import dns from "node:dns";
// dns.setDefaultResultOrder("ipv4first");
// console.log('DNS order:', require('node:dns').getDefaultResultOrder?.());
import { withErrorHandler } from "@//lib/mongodb/withErrorHandler";
import { UserService } from "@//services/user/UserService";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// console.log("DNS order:", require("node:dns").getDefaultResultOrder?.());
//Define your auth options separately
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      httpOptions: {
        timeout: 10000, // increase to 10 seconds
      },

      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({
      user,
      account,
      profile,
      email,
      credentials,
    }: Record<string, any>) {
      const userData = { ...user } as {
        id: string;
        name: string;
        email: string;
        image: string;
        // access_token?: string;
        // refresh_token?: string;
      };
      const access_token = account?.access_token;
      const refresh_token = account?.refresh_token;

      await withErrorHandler(async () => {
        const userService = UserService.getInstance();
        await userService.createUser({
          ...userData,
          access_token,
          refresh_token,
        });
      })();
      //db query here
      return true;
    },
    async redirect({ url, baseUrl }: Record<string, any>) {
      //After signin
      if (url.startsWith("/")) return `${baseUrl}/projects`;
      if (new URL(url).origin === baseUrl) return `${baseUrl}/projects`;

      return baseUrl;
    },
    //every time session is checked
    async session({ session, user, token }: Record<string, any>) {
      if (token?.userId) {
        session.user.id = token.userId;
      }
      return session;
    },
    async jwt({
      token,
      user,
      account,
      profile,
      isNewUser,
    }: Record<string, any>) {
      if (user) {
        try {
          //if its a new sign in get user from DB
          const userService = UserService.getInstance();
          const dbUser = await userService.findByEmail(user.email);

          if (dbUser) {
            token.userId = dbUser._id.toString();
          }
        } catch (error) {
          console.log(error?.message);
        }
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
