CREATE TABLE "questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"fromUser" uuid,
	"toUser" uuid NOT NULL,
	"questionText" varchar(2048) NOT NULL,
	"answerText" varchar(2048),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"answeredAt" timestamp,
	CONSTRAINT "questions_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_fromUser_users_id_fk" FOREIGN KEY ("fromUser") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_toUser_users_id_fk" FOREIGN KEY ("toUser") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;