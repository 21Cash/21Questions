import {
  pgTable,
  uuid,
  varchar,
  serial,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 128 }).notNull(),
  bio: varchar("bio", { length: 255 }).default(""),
  hideUnansweredQuestions: boolean("hideUnansweredQuestions").default(true),
});

export const questions = pgTable("questions", {
  id: serial("id").primaryKey().unique().notNull(),
  toUser: uuid("toUser")
    .references(() => users.id)
    .notNull(),
  questionText: varchar("questionText", { length: 2048 }).notNull(),
  answerText: varchar("answerText", { length: 2048 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  answeredAt: timestamp("answeredAt"),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  askedQuestions: many(questions),
  answeredQuestions: many(questions),
}));

// Type Exports
export type User = InferSelectModel<typeof users>;
export type UserInsert = InferInsertModel<typeof users>;

export type Question = InferSelectModel<typeof questions>;
export type QuestionInsert = InferInsertModel<typeof questions>;
