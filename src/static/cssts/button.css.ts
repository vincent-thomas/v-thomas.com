import { recipe } from "@vanilla-extract/recipes";
import { createVar } from "@vanilla-extract/css";

const decoration = createVar();

export const button = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",

    transition: "background-color 0.1s ease, border-radius 0.1s ease 0.025s",

    borderRadius: "2.5rem",

    fontWeight: 600,

    textDecoration: decoration,
    textDecorationThickness: "2px",

    ":hover": {
      borderRadius: "0%",
    },
  },

  variants: {
    accent: {
      blue: {
        color: "var(--blue-11)",
        ":hover": {
          color: "var(--blue-12)",
          backgroundColor: "var(--blue-8)",
        },
      },
      red: {
        color: "var(--red-11)",
        ":hover": {
          color: "var(--red-12)",
          backgroundColor: "var(--red-8)",
        },
      },
    },
    size: {
      default: {
        padding: "0.4rem 0.7rem",
      },
    },

    underline: {
      true: {
        vars: {
          [decoration]: "underline",
        },
        ":hover": {
          vars: {
            [decoration]: "none",
          },
        },
      },
      false: {
        vars: {
          [decoration]: "none",
        },
      },
    },
  },
  defaultVariants: {
    size: "default",
    underline: false,
    accent: "blue",
  },
});
