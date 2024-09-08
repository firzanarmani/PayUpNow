import { Link as RouterLink, type LinkProps } from "@tanstack/react-router";

export function Link({
  children,
  to,
  newTab,
  ...other
}: LinkProps & { newTab?: boolean }): JSX.Element {
  return (
    <RouterLink
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Temporarily disabled until working solution found
      to={to}
      rel={newTab ? "noreferrer" : undefined}
      target={newTab ? "_blank" : undefined}
      {...other}
    >
      {children}
    </RouterLink>
  );
}
