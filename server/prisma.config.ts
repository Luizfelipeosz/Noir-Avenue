
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations-postgresql",
  },
  datasource: {
    url: env("postgresql://neondb_owner:npg_3iqLPxeV9glK@ep-old-sea-b6tfry4g.c-2.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"),
  },
});
