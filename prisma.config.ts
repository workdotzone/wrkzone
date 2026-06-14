import "dotenv/config";
import { defineConfig } from "prisma/config";

// With a Prisma config file present, the CLI no longer auto-loads .env,
// so we import dotenv above to keep DATABASE_URL available.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
});
