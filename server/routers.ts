import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import {
  getProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getProductsByRegion,
  getProductById,
  getProductsByPriceRange,
  getEvents,
  getUpcomingEvents,
  getEventById,
  getEventsByCategory,
  getBlogArticles,
  getBlogArticleById,
  getBlogArticlesByCategory,
  getLatestBlogArticles,
  createOrder,
  getUserOrders,
} from "./db";
import {
  createCheckoutSession,
  getUserPaymentHistory,
  getPaymentByOrderId,
} from "./stripe";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  products: router({
    list: publicProcedure.query(() => getProducts()),
    featured: publicProcedure.query(() => getFeaturedProducts()),
    byCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(({ input }) => getProductsByCategory(input.category)),
    byRegion: publicProcedure
      .input(z.object({ region: z.string() }))
      .query(({ input }) => getProductsByRegion(input.region)),
    byId: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => getProductById(input.id)),
    byPriceRange: publicProcedure
      .input(z.object({ minPrice: z.number(), maxPrice: z.number() }))
      .query(({ input }) => getProductsByPriceRange(input.minPrice, input.maxPrice)),
  }),

  events: router({
    list: publicProcedure.query(() => getEvents()),
    upcoming: publicProcedure.query(() => getUpcomingEvents()),
    byId: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => getEventById(input.id)),
    byCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(({ input }) => getEventsByCategory(input.category)),
  }),

  blog: router({
    list: publicProcedure.query(() => getBlogArticles()),
    latest: publicProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(({ input }) => getLatestBlogArticles(input.limit)),
    byId: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => getBlogArticleById(input.id)),
    byCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(({ input }) => getBlogArticlesByCategory(input.category)),
  }),

  orders: router({
    create: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          firstName: z.string(),
          lastName: z.string().optional(),
          phone: z.string().optional(),
          address: z.string(),
          city: z.string().optional(),
          postalCode: z.string().optional(),
          country: z.string().optional(),
          total: z.number(),
          items: z.string(),
        })
      )
      .mutation(({ input }) =>
        createOrder({
          email: input.email,
          firstName: input.firstName,
          lastName: input.lastName,
          phone: input.phone,
          address: input.address,
          city: input.city,
          postalCode: input.postalCode,
          country: input.country || "Germany",
          total: input.total,
          items: input.items,
        })
      ),
    userOrders: protectedProcedure.query(({ ctx }) => getUserOrders(ctx.user.id)),
  }),

  payment: router({
    createCheckoutSession: protectedProcedure
      .input(
        z.object({
          orderId: z.number(),
          items: z.array(
            z.object({
              name: z.string(),
              price: z.number(),
              quantity: z.number(),
            })
          ),
          total: z.number(),
          successUrl: z.string(),
          cancelUrl: z.string(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const session = await createCheckoutSession(
          input.orderId,
          ctx.user.id,
          ctx.user.email || "",
          input.items,
          input.total,
          input.successUrl,
          input.cancelUrl
        );
        return {
          checkoutUrl: session.url,
          sessionId: session.id,
        };
      }),
    paymentHistory: protectedProcedure.query(async ({ ctx }) => {
      return await getUserPaymentHistory(ctx.user.id);
    }),
    paymentDetails: protectedProcedure
      .input(z.object({ orderId: z.number() }))
      .query(async ({ input }) => {
        return await getPaymentByOrderId(input.orderId);
      }),
  }),
});

export type AppRouter = typeof appRouter;
