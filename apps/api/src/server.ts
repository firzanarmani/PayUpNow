import { Hono } from "hono";
import { cors } from "hono/cors";
import { type HonoAppType } from "./types/hono";
import { RootRouter } from "./routes/root";
import { QrRouter } from "./routes/qr";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- Take advantage of the Hono's type inferencing for routes
export const createServer = () => {
  const app = new Hono<HonoAppType>()
    .use("/*", cors())
    .route("/", RootRouter)
    .route("/qr", QrRouter);

  return app;
};
