import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const menuCategories = pgTable("menu_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  sortOrder: integer("sort_order").notNull().default(0)
});

export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").references(() => menuCategories.id),
  name: text("name").notNull(),
  description: text("description").notNull(),
  priceCents: integer("price_cents").notNull(),
  heat: integer("heat").notNull().default(1),
  featured: boolean("featured").notNull().default(false),
  available: boolean("available").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const cateringRequests = pgTable("catering_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  guestCount: integer("guest_count").notNull(),
  eventDate: timestamp("event_date").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
