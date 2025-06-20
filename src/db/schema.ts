import { boolean, integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

// Enums
export const formStatusEnum = pgEnum("form_status", ["draft", "published", "archived"]);
export const questionTypeEnum = pgEnum("question_type", ["multiple_choice", "yes_no", "text", "textarea"]);
export const responseStatusEnum = pgEnum("response_status", ["draft", "completed", "archived", "locked"]);
export const permissionEnum = pgEnum("permission", ["view", "edit", "admin"]);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").$defaultFn(() => false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
  updatedAt: timestamp("updated_at").$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
  role: text("role"),
  banned: boolean("banned"),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires")
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  activeOrganizationId: text("active_organization_id"),
  impersonatedBy: text("impersonated_by")
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull()
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(() => /* @__PURE__ */ new Date()),
  updatedAt: timestamp("updated_at").$defaultFn(() => /* @__PURE__ */ new Date())
});

export const organization = pgTable("organization", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique(),
  logo: text("logo"),
  createdAt: timestamp("created_at").notNull(),
  metadata: text("metadata")
});

export const member = pgTable("member", {
  id: text("id").primaryKey(),
  organizationId: text("organization_id").notNull().references(() => organization.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  role: text("role").default("member").notNull(),
  createdAt: timestamp("created_at").notNull()
});

export const invitation = pgTable("invitation", {
  id: text("id").primaryKey(),
  organizationId: text("organization_id").notNull().references(() => organization.id, { onDelete: "cascade" }),
  email: text("email").notNull(),
  role: text("role"),
  status: text("status").default("pending").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  inviterId: text("inviter_id").notNull().references(() => user.id, { onDelete: "cascade" })
});

export const form = pgTable("form", {
  id: text("id").primaryKey().$defaultFn(() => `frm_${nanoid()}`),
  title: text("title").notNull(),
  description: text("description"),
  isShared: boolean("is_shared").default(false).notNull(),
  status: formStatusEnum("status").default("draft").notNull(),
  version: text("version").default("1.0").notNull(),
  createdBy: text("created_by").notNull().references(() => user.id),
  ownerOrganizationId: text("owner_organization_id").notNull().references(() => organization.id, { onDelete: "cascade" }),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()).notNull(),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()).notNull()
});

export const formSection = pgTable("form_section", {
  id: text("id").primaryKey().$defaultFn(() => `frm_sec_${nanoid()}`),
  formId: text("form_id").notNull().references(() => form.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()).notNull(),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()).notNull()
});

export const formQuestion = pgTable("form_question", {
  id: text("id").primaryKey().$defaultFn(() => `frm_q_${nanoid()}`),
  sectionId: text("section_id").notNull().references(() => formSection.id, { onDelete: "cascade" }),
  type: questionTypeEnum("type").notNull(),
  question: text("question").notNull(),
  isRequired: boolean("is_required").default(false).notNull(),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()).notNull(),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()).notNull()
});

export const questionOption = pgTable("question_option", {
  id: text("id").primaryKey().$defaultFn(() => `frm_opt_${nanoid()}`),
  questionId: text("question_id").notNull().references(() => formQuestion.id, { onDelete: "cascade" }),
  text: text("text").notNull(),
  value: text("value").notNull(),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()).notNull(),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()).notNull()
});

export const formResponse = pgTable("form_response", {
  id: text("id").primaryKey().$defaultFn(() => `frm_resp_${nanoid()}`),
  formId: text("form_id").notNull().references(() => form.id, { onDelete: "cascade" }),
  organizationId: text("organization_id").notNull().references(() => organization.id, { onDelete: "cascade" }),
  patientId: text("patient_id").references(() => user.id),
  status: responseStatusEnum("status").default("draft").notNull(),
  submittedAt: timestamp("submitted_at"),
  lastEditedAt: timestamp("last_edited_at"),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()).notNull(),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()).notNull()
});

export const responseAnswer = pgTable("response_answer", {
  id: text("id").primaryKey().$defaultFn(() => `frm_ans_${nanoid()}`),
  responseId: text("response_id").notNull().references(() => formResponse.id, { onDelete: "cascade" }),
  questionId: text("question_id").notNull().references(() => formQuestion.id, { onDelete: "cascade" }),
  answer: text("answer").notNull(),
  lastEditedAt: timestamp("last_edited_at"),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()).notNull(),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()).notNull()
});

export const formShare = pgTable("form_share", {
  id: text("id").primaryKey().$defaultFn(() => `frm_share_${nanoid()}`),
  formId: text("form_id").notNull().references(() => form.id, { onDelete: "cascade" }),
  organizationId: text("organization_id").notNull().references(() => organization.id, { onDelete: "cascade" }),
  permission: permissionEnum("permission").default("view").notNull(),
  sharedBy: text("shared_by").notNull().references(() => user.id),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()).notNull(),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()).notNull()
});

export const formTag = pgTable("form_tag", {
  id: text("id").primaryKey().$defaultFn(() => `frm_tag_${nanoid()}`),
  name: text("name").notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()).notNull(),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()).notNull()
});

export const formTagRelation = pgTable("form_tag_relation", {
  id: text("id").primaryKey().$defaultFn(() => `frm_tag_rel_${nanoid()}`),
  formId: text("form_id").notNull().references(() => form.id, { onDelete: "cascade" }),
  tagId: text("tag_id").notNull().references(() => formTag.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()).notNull(),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()).notNull()
});
