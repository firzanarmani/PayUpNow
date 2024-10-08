import { createRoot } from "react-dom/client";
import { describe, it } from "vitest";
import { Link } from ".";

describe("Link", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(<Link to="https://turbo.build/repo">Turborepo Docs</Link>);
    root.unmount();
  });
});
