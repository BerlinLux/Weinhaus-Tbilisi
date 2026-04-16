import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

import { products, events, blogArticles, orders } from "../drizzle/schema";
import { desc, and, gte, lte } from "drizzle-orm";

/**
 * Product queries
 */
export async function getProducts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(products).orderBy(products.createdAt);
}

export async function getFeaturedProducts() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(products)
    .where(eq(products.featured, 1))
    .orderBy(desc(products.createdAt));
}

export async function getProductsByCategory(category: string) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(products)
    .where(eq(products.category, category as any))
    .orderBy(products.createdAt);
}

export async function getProductsByRegion(region: string) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(products)
    .where(eq(products.region, region))
    .orderBy(products.createdAt);
}

export async function getProductById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getProductsByPriceRange(minPrice: number, maxPrice: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(products)
    .where(and(gte(products.price, minPrice), lte(products.price, maxPrice)))
    .orderBy(products.price);
}

/**
 * Event queries
 */
export async function getEvents() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(events).orderBy(desc(events.date));
}

export async function getUpcomingEvents() {
  const db = await getDb();
  if (!db) return [];
  const now = new Date();
  return db
    .select()
    .from(events)
    .where(gte(events.date, now))
    .orderBy(events.date);
}

export async function getEventById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(events).where(eq(events.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getEventsByCategory(category: string) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(events)
    .where(eq(events.category, category))
    .orderBy(desc(events.date));
}

/**
 * Blog queries
 */
export async function getBlogArticles() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(blogArticles)
    .where(eq(blogArticles.published, 1))
    .orderBy(desc(blogArticles.date));
}

export async function getBlogArticleById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select()
    .from(blogArticles)
    .where(and(eq(blogArticles.id, id), eq(blogArticles.published, 1)))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getBlogArticlesByCategory(category: string) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(blogArticles)
    .where(and(eq(blogArticles.category, category), eq(blogArticles.published, 1)))
    .orderBy(desc(blogArticles.date));
}

export async function getLatestBlogArticles(limit: number = 5) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(blogArticles)
    .where(eq(blogArticles.published, 1))
    .orderBy(desc(blogArticles.date))
    .limit(limit);
}

/**
 * Order queries
 */
export async function getOrderById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserOrders(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(orders)
    .where(eq(orders.userId, userId))
    .orderBy(desc(orders.createdAt));
}

export async function createOrder(data: {
  userId?: number;
  email: string;
  firstName: string;
  lastName?: string;
  phone?: string;
  address: string;
  city?: string;
  postalCode?: string;
  country?: string;
  total: number;
  items: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(orders).values(data);
}
