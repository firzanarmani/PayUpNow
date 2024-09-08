import { log } from "..";
import { vi, describe, it, expect } from "vitest";

vi.spyOn(global.console, "log");

describe("@payupnow/logger", () => {
  it("prints a message", () => {
    log("hello1");
    // eslint-disable-next-line no-console -- testing console
    expect(console.log).toHaveBeenCalledWith("LOGGER: ", "hello1");
  });
});
