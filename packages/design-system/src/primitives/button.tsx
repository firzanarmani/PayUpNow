import { ark } from "@ark-ui/react/factory";
import { styled } from "@payupnow/styled-system/jsx";
import { button } from "@payupnow/styled-system/recipes";
import { type ComponentProps } from "react";

export const Button = styled(ark.button, button);
export type ButtonProps = ComponentProps<typeof Button>;
