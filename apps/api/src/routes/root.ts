import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { type HonoAppType } from "../types/hono";
import * as schema from "../db/schema";

export const RootRouter = new Hono<HonoAppType>()
  .get("/message/:name", async (c) => {
    const db = drizzle(c.env.DB, { schema });

    const name = await db.query.namesTable.findFirst({
      where: (names, { eq }) => eq(names.name, c.req.param("name")),
    });

    if (name)
      return c.json({ message: `Welcome back ${c.req.param("name")}.` });

    try {
      const newName = await db
        .insert(schema.namesTable)
        .values({ name: c.req.param("name") })
        .returning();

      return c.json({
        message: `Hello ${newName[0].name}.`,
      });
    } catch (error) {
      return c.json({
        message: `Unable to create a new user named ${c.req.param("name")}.`,
      });
    }
  })
  .get("/status", (c) => {
    return c.json({
      ok: true,
      publicKey: c.env.SOME_PUBLIC_KEY,
      secretKey: c.env.SOME_SECRET_KEY,
    });
  });
