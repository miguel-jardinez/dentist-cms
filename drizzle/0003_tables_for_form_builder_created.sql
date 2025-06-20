CREATE TYPE "public"."form_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TYPE "public"."permission" AS ENUM('view', 'edit', 'admin');--> statement-breakpoint
CREATE TYPE "public"."question_type" AS ENUM('multiple_choice', 'yes_no', 'text', 'textarea');--> statement-breakpoint
CREATE TYPE "public"."response_status" AS ENUM('draft', 'completed', 'archived', 'locked');--> statement-breakpoint
CREATE TABLE "form" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"is_shared" boolean DEFAULT false NOT NULL,
	"status" "form_status" DEFAULT 'draft' NOT NULL,
	"version" text DEFAULT '1.0' NOT NULL,
	"created_by" text NOT NULL,
	"owner_organization_id" text NOT NULL,
	"published_at" timestamp,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "form_question" (
	"id" text PRIMARY KEY NOT NULL,
	"section_id" text NOT NULL,
	"type" "question_type" NOT NULL,
	"question" text NOT NULL,
	"is_required" boolean DEFAULT false NOT NULL,
	"order" integer NOT NULL,
	"validation" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "form_response" (
	"id" text PRIMARY KEY NOT NULL,
	"form_id" text NOT NULL,
	"organization_id" text NOT NULL,
	"patient_id" text,
	"status" "response_status" DEFAULT 'draft' NOT NULL,
	"submitted_at" timestamp,
	"last_edited_at" timestamp,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "form_section" (
	"id" text PRIMARY KEY NOT NULL,
	"form_id" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"order" integer NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "form_share" (
	"id" text PRIMARY KEY NOT NULL,
	"form_id" text NOT NULL,
	"organization_id" text NOT NULL,
	"permission" "permission" DEFAULT 'view' NOT NULL,
	"shared_by" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "form_tag" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "form_tag_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "form_tag_relation" (
	"id" text PRIMARY KEY NOT NULL,
	"form_id" text NOT NULL,
	"tag_id" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "question_option" (
	"id" text PRIMARY KEY NOT NULL,
	"question_id" text NOT NULL,
	"text" text NOT NULL,
	"value" text NOT NULL,
	"order" integer NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "response_answer" (
	"id" text PRIMARY KEY NOT NULL,
	"response_id" text NOT NULL,
	"question_id" text NOT NULL,
	"answer" text NOT NULL,
	"last_edited_at" timestamp,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "form" ADD CONSTRAINT "form_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form" ADD CONSTRAINT "form_owner_organization_id_organization_id_fk" FOREIGN KEY ("owner_organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_question" ADD CONSTRAINT "form_question_section_id_form_section_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."form_section"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_response" ADD CONSTRAINT "form_response_form_id_form_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."form"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_response" ADD CONSTRAINT "form_response_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_response" ADD CONSTRAINT "form_response_patient_id_user_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_section" ADD CONSTRAINT "form_section_form_id_form_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."form"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_share" ADD CONSTRAINT "form_share_form_id_form_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."form"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_share" ADD CONSTRAINT "form_share_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_share" ADD CONSTRAINT "form_share_shared_by_user_id_fk" FOREIGN KEY ("shared_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_tag_relation" ADD CONSTRAINT "form_tag_relation_form_id_form_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."form"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_tag_relation" ADD CONSTRAINT "form_tag_relation_tag_id_form_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."form_tag"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "question_option" ADD CONSTRAINT "question_option_question_id_form_question_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."form_question"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "response_answer" ADD CONSTRAINT "response_answer_response_id_form_response_id_fk" FOREIGN KEY ("response_id") REFERENCES "public"."form_response"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "response_answer" ADD CONSTRAINT "response_answer_question_id_form_question_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."form_question"("id") ON DELETE cascade ON UPDATE no action;