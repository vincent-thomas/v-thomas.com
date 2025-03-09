import { recipe } from "@vanilla-extract/recipes";

export const blogHeroImage = recipe({
  base: {
    borderRadius: "0.5rem",
  },
  variants: {
    forTheme: {
      dark: {
        "@media": {
          "(prefers-color-scheme: light)": {
            display: "none",
          },
        },
      },
      light: {
        "@media": {
          "(prefers-color-scheme: dark)": {
            display: "none",
          },
        },
      },
    },
  },
});
