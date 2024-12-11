import { drizzle } from "drizzle-orm/neon-http";
import drizzleConfig from "./drizzle.config";

export const db = drizzle(process.env.DATABASE_URL!);
