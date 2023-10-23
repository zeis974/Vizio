import { createTheme } from "@kuma-ui/core";

const theme = createTheme({
  breakpoints: {
    mobile: "768px",
    md: "700px",
  },
});

type UserTheme = typeof theme;

declare module "@kuma-ui/core" {
  export interface Theme extends UserTheme {}
}

export default theme;
