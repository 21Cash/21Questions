import { pgTableCreator, serial, varchar } from "drizzle-orm/pg-core";

export const pgTable = pgTableCreator(
  (name) => `${process.env.PROJECT_NAME}_${name}`
);

export const User = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
});
