import { createServer } from "./server";

const app = createServer();

export default app;
export type AppType = typeof app;
