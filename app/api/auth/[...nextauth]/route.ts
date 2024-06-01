import { db } from "#/schema";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  callbacks: {
    jwt: async ({ account, profile, token, user }) => {
      if (user) {
        token.user = user;
        if ("role" in user) {
          token.role = user.role;
        }
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          accessToken: token.accessToken,
          id: token.sub,
          picture: token.picture,
          role: token.role,
        },
      };
    },
  },
  debug:
    process.env.NEXTAUTH_DEBUG === undefined
      ? true
      : Boolean(process.env.NEXTAUTH_DEBUG),
  providers: [
    // マジックリンクによるログインの設定
    EmailProvider({
      from: process.env.EMAIL_FROM,
      maxAge: 0.25 * 60 * 60, // 有効期限は15分
      // NOTE: メールサーバが用意できないときは下記を有効にする。URLがログに出力される
      // sendVerificationRequest: async (params) => {
      // console.log("sendVerificationRequest", params);
      // },
      // nodemailerのオブジェクトで指定する。
      server: {
        auth: {
          pass: process.env.EMAIL_SERVER_PASSWORD,
          user: process.env.EMAIL_SERVER_USERNAME,
        },
        // NOTE: serviceの指定があるときはhostとportを無視する。
        host: process.env.EMAIL_SERVER_SERVICE
          ? undefined
          : process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_SERVICE
          ? undefined
          : process.env.EMAIL_SERVER_PORT,
        requiresAuth: true,
        service: process.env.EMAIL_SERVER_SERVICE
          ? process.env.EMAIL_SERVER_SERVICE
          : undefined,
      },
    }),
    // NOTE: 任意のユーザ認証を実装したいとき
    // CredentialsProvider({
    // async authorize(credentials) {
    // // TODO: データベースなどからのユーザ情報取得を書く
    // const users = [
    // { email: "user1@example.com", id: "1", password: "password1" },
    // { email: "user2@example.com", id: "2", password: "password2" },
    // { email: "abc@abc", id: "3", password: "123" },
    // ];
    // // !!! ユーザ認証をする !!!
    // // パスワードのハッシュやソルトなどは全く考慮していないので、各自、実装すること
    // const user = users.find((user) => user.email === credentials?.email);
    // if (user && user?.password === credentials?.password) {
    // return {
    // email: user.email,
    // id: user.id,
    // name: user.email,
    // role: "admin",
    // };
    // } else {
    // return null;
    // }
    // },
    // credentials: {
    // email: {
    // label: "メールアドレス",
    // placeholder: "メールアドレスを入力して下さい",
    // type: "email",
    // },
    // password: {
    // label: "パスワード",
    // placeholder: "パスワードを入力して下さい",
    // type: "password",
    // }),
  ],
  session: { strategy: "jwt" },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
