import { CounterButton, Link } from "@payupnow/design-system";
import { container } from "@payupnow/styled-system/patterns";
import { createFileRoute } from "@tanstack/react-router";
import { css } from "@payupnow/styled-system/css";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

const statusQueryOptions = queryOptions({
  queryKey: ["status"],
  queryFn: async () => {
    const res = await api.status.$get();
    return await res.json();
  },
});

export const Route = createFileRoute("/")({
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(statusQueryOptions),
  component: Index,
});

function Index(): JSX.Element {
  const { data: status } = useSuspenseQuery(statusQueryOptions);

  return (
    <div className={container({ padding: "10" })}>
      <h1 className={css({ fontSize: "5xl", fontWeight: "bold", margin: "0" })}>
        Website <br />
        <span
          className={css({
            display: "inline-block",
            bgGradient: "to-r",
            gradientFrom: "#3b82f6",
            gradientTo: "#ef4444",
            backgroundClip: "text",
            color: "transparent",
          })}
        >
          Armani.dev Stack
        </span>
      </h1>
      <CounterButton />
      <p
        className={css({ color: "black", fontWeight: "medium" })}
      >{`API status is ${status.ok ? "" : "not"} ok!`}</p>
      <p className={css({ color: "#9ca3af", fontWeight: "medium" })}>
        Built With{" "}
        <Link to="https://turbo.build/repo" newTab>
          <span
            className={css({
              color: "#3b82f6",
              textDecoration: { base: "none", _hover: "underline" },
            })}
          >
            Turborepo
          </span>
        </Link>
        {" & "}
        <Link to="https://vitejs.dev/" newTab>
          <span
            className={css({
              color: "#3b82f6",
              textDecoration: { base: "none", _hover: "underline" },
            })}
          >
            Vite
          </span>
        </Link>
      </p>
    </div>
  );
}
