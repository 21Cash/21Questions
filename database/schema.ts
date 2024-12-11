import { pgTableCreator, uuid, varchar } from "drizzle-orm/pg-core";

export const pgTable = pgTableCreator(
  (name) => `${process.env.PROJECT_NAME}_${name}`
);

export const TestUser = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
});
