import { auth, AuthConfig } from "./_generated/server";

const config: AuthConfig = {
  providers: [
    auth.providers.github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
};

export default config;
