import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Products table
export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  externalId: varchar("externalId", { length: 64 }).notNull().unique(),
  category: mysqlEnum("category", ["bottle", "barrel", "qvevri", "voucher"]).notNull(),
  nameDE: varchar("nameDE", { length: 255 }).notNull(),
  nameEN: varchar("nameEN", { length: 255 }).notNull(),
  nameKA: varchar("nameKA", { length: 255 }).notNull(),
  descriptionDE: text("descriptionDE"),
  descriptionEN: text("descriptionEN"),
  descriptionKA: text("descriptionKA"),
  price: int("price").notNull(), // in cents
  region: varchar("region", { length: 100 }),
  image: text("image"),
  featured: int("featured").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

// Events table
export const events = mysqlTable("events", {
  id: int("id").autoincrement().primaryKey(),
  externalId: varchar("externalId", { length: 64 }).notNull().unique(),
  nameDE: varchar("nameDE", { length: 255 }).notNull(),
  nameEN: varchar("nameEN", { length: 255 }).notNull(),
  nameKA: varchar("nameKA", { length: 255 }).notNull(),
  descriptionDE: text("descriptionDE"),
  descriptionEN: text("descriptionEN"),
  descriptionKA: text("descriptionKA"),
  date: timestamp("date").notNull(),
  price: int("price").notNull(), // in cents
  seats: int("seats").notNull(),
  seatsBooked: int("seatsBooked").default(0),
  venueDE: varchar("venueDE", { length: 255 }),
  venueEN: varchar("venueEN", { length: 255 }),
  venueKA: varchar("venueKA", { length: 255 }),
  image: text("image"),
  category: varchar("category", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Event = typeof events.$inferSelect;
export type InsertEvent = typeof events.$inferInsert;

// Blog articles table
export const blogArticles = mysqlTable("blogArticles", {
  id: int("id").autoincrement().primaryKey(),
  externalId: varchar("externalId", { length: 64 }).notNull().unique(),
  titleDE: varchar("titleDE", { length: 255 }).notNull(),
  titleEN: varchar("titleEN", { length: 255 }).notNull(),
  titleKA: varchar("titleKA", { length: 255 }).notNull(),
  contentDE: text("contentDE"),
  contentEN: text("contentEN"),
  contentKA: text("contentKA"),
  excerptDE: text("excerptDE"),
  excerptEN: text("excerptEN"),
  excerptKA: text("excerptKA"),
  date: timestamp("date").notNull(),
  category: varchar("category", { length: 100 }),
  image: text("image"),
  published: int("published").default(1),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlogArticle = typeof blogArticles.$inferSelect;
export type InsertBlogArticle = typeof blogArticles.$inferInsert;

// Orders table
export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").references(() => users.id),
  email: varchar("email", { length: 320 }).notNull(),
  firstName: varchar("firstName", { length: 100 }).notNull(),
  lastName: varchar("lastName", { length: 100 }),
  phone: varchar("phone", { length: 20 }),
  address: text("address").notNull(),
  city: varchar("city", { length: 100 }),
  postalCode: varchar("postalCode", { length: 20 }),
  country: varchar("country", { length: 100 }).default("Germany"),
  total: int("total").notNull(), // in cents
  status: mysqlEnum("status", ["pending", "confirmed", "shipped", "delivered", "cancelled"]).default("pending"),
  items: text("items"), // JSON array
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

// Stripe customers table - maps users to Stripe customer IDs
export const stripeCustomers = mysqlTable("stripeCustomers", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique().references(() => users.id),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }).notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type StripeCustomer = typeof stripeCustomers.$inferSelect;
export type InsertStripeCustomer = typeof stripeCustomers.$inferInsert;

// Stripe payments table - tracks payment intents and their status
export const stripePayments = mysqlTable("stripePayments", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId").notNull().references(() => orders.id),
  userId: int("userId").notNull().references(() => users.id),
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }).notNull().unique(),
  stripeCheckoutSessionId: varchar("stripeCheckoutSessionId", { length: 255 }).unique(),
  amount: int("amount").notNull(), // in cents
  currency: varchar("currency", { length: 3 }).default("EUR"),
  status: mysqlEnum("status", ["pending", "succeeded", "failed", "canceled"]).default("pending"),
  metadata: text("metadata"), // JSON object for storing additional info
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type StripePayment = typeof stripePayments.$inferSelect;
export type InsertStripePayment = typeof stripePayments.$inferInsert;