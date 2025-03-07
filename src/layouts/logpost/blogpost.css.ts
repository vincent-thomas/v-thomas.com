import { style } from "@vanilla-extract/css";
export const onlyDarkImage = style({
  "@media": {
    "(prefers-color-scheme: light)": {
      display: "none",
    },
  },
});

export const onlyLightImage = style({
  "@media": {
    "(prefers-color-scheme: dark)": {
      display: "none",
    },
  },
});
