import {
  createExecutionContext,
  env,
  waitOnExecutionContext,
} from "cloudflare:test";
import { describe, it, expect } from "vitest";
import app from "..";

const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe("server", () => {
  it("health check returns 200", async () => {
    const req = new IncomingRequest("http://example.com/status");
    const ctx = createExecutionContext();

    const res = await app.fetch(req, env, ctx);

    await waitOnExecutionContext(ctx);

    expect(res.status).toBe(200);
    expect(res.ok).toBe(true);
  });

  it("message endpoint says hello", async () => {
    const req1 = new IncomingRequest("http://example.com/message/jared");
    const ctx1 = createExecutionContext();

    const res1 = await app.fetch(req1, env, ctx1);
    await waitOnExecutionContext(ctx1);

    const data1 = await res1.json();

    expect(res1.status).toBe(200);
    expect(data1).toEqual({ message: "Hello jared." });

    const req2 = new IncomingRequest("http://example.com/message/jared");
    const ctx2 = createExecutionContext();

    const res2 = await app.fetch(req2, env, ctx2);
    await waitOnExecutionContext(ctx2);

    const data2 = await res2.json();

    expect(res2.status).toBe(200);
    expect(data2).toEqual({ message: "Welcome back jared." });
  });
});
