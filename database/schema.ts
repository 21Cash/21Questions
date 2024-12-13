import { pgTable, uuid, varchar, serial, timestamp } from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 128 }).notNull(),
  bio: varchar("bio", { length: 255 }).default(""),
});

export const questions = pgTable("questions", {
  id: serial("id").primaryKey().unique().notNull(),
  fromUser: uuid("fromUser").references(() => users.id),
  toUser: uuid("toUser")
    .references(() => users.id)
    .notNull(),
  questionText: varchar("questionText", { length: 2048 }).notNull(),
  answerText: varchar("answerText", { length: 2048 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  answeredAt: timestamp("answeredAt"),
});

export type User = InferSelectModel<typeof users>;
export type UserInsert = InferInsertModel<typeof users>;

export type Question = InferSelectModel<typeof questions>;
export type QuestionInsert = InferInsertModel<typeof questions>;
