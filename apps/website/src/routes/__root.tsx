import { Box, Container } from "@payupnow/styled-system/jsx";
import { type QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

function RootLayout(): JSX.Element {
  return (
    <Box minH="100vh" backgroundColor="background">
      <Container pt={{ base: "4", md: "8" }} pb={{ base: "2", md: "4" }}>
        <Outlet />
      </Container>
      <TanStackRouterDevtools />
    </Box>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: RootLayout,
  }
);
