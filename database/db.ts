import { drizzle } from "drizzle-orm/neon-http";
import drizzleConfig from "./drizzle.config";
import { pgSchema } from "drizzle-orm/pg-core";
import * as schema from "./schema";

export const db = drizzle(process.env.DATABASE_URL!, { schema });
