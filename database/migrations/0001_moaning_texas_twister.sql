ALTER TABLE "questions" DROP CONSTRAINT "questions_fromUser_users_id_fk";
--> statement-breakpoint
ALTER TABLE "questions" DROP COLUMN "fromUser";