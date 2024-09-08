import React from "react";
import { createRoot } from "react-dom/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createRouter,
  ErrorComponent,
  RouterProvider,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPendingComponent: () => (
    <div className="min-w-screen flex min-h-screen items-center justify-center">
      <div className="p-2 text-2xl">Loading</div>
    </div>
  ),
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
});

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.StrictMode>
  );
} else {
  throw new Error("Could not find root element");
}
