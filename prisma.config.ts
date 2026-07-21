import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// Used by the Prisma CLI (migrate, studio, db push) only. The app itself
// connects through the pg driver adapter in src/server/db.ts.
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
