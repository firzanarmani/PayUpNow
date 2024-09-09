import { Hono } from "hono";
import { generatePayNow } from "@payupnow/paynow-qr-generator";
import dayjs from "dayjs";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { type HonoAppType } from "../types/hono";

export const QrRouter = new Hono<HonoAppType>().post(
  "/",
  zValidator(
    "json",
    z.object({ uen: z.string(), amount: z.number(), refNumber: z.string() })
  ),
  async (c) => {
    const formData = c.req.valid("json");

    // eslint-disable-next-line @typescript-eslint/await-thenable -- Not too sure why this promise is behaving in this way
    const item = await generatePayNow({
      uen: formData.uen,
      amount: formData.amount,
      expiry: dayjs().add(1, "day"),
      refNumber: formData.refNumber,
      editable: false,
    });

    return c.body(item, {
      headers: {
        "Content-Type": "image/svg+xml",
      },
    });
  }
);
