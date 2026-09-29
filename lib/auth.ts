import { betterAuth } from "better-auth";
import { twoFactor, username } from "better-auth/plugins";
import { Pool } from "pg";
import { isValidUsername, normalizeUsername } from "@/lib/username";

const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 10 });

export const auth = betterAuth({
  appName: "Ganymai",
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: pool,
  emailAndPassword: { enabled: true, minPasswordLength: 10 },
  user: {
    additionalFields: {
      usernameChangedAt: { type: "date", required: false, input: false },
    },
  },
  advanced: { database: { joins: true } },
  plugins: [
    username({
      minUsernameLength: 2,
      maxUsernameLength: 32,
      usernameValidator: isValidUsername,
      usernameNormalization: normalizeUsername,
    }),
    twoFactor({
      issuer: "Ganymai",
      backupCodeOptions: { amount: 10, length: 10 },
    }),
  ],
});
