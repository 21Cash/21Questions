CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(255) NOT NULL,
	"password" varchar(128) NOT NULL,
	"bio" varchar(255),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
