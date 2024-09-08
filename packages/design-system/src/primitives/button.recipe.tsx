import { defineRecipe } from "@pandacss/dev";

export const buttonRecipe = defineRecipe({
  className: "button",
  base: {
    paddingX: "4",
    paddingY: "2",
    borderRadius: "sm",
    display: "inline-block",
    cursor: "pointer",
  },
});
