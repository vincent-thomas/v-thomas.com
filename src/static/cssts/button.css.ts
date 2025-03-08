import { recipe } from "@vanilla-extract/recipes";
import { createVar } from "@vanilla-extract/css";

const spacingY = createVar();
const spacingX = createVar();

export const button = recipe({
  defaultVariants: {
    size: "default",
    underline: false,
    accent: "blue",
  },
  base: {
    paddingInline: spacingX,
    paddingBlock: spacingY,

    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",

    fontWeight: 600,

    position: "relative",

    "::before": {
      transition: "all 0.1s ease-in-out",
      zIndex: -1,
      content: '""',
      position: "absolute",
    },

    selectors: {
      "&:hover::before": {
        width: `100%`,
        left: `0`,

        height: `100%`,
        bottom: `0`,
      },
    },
  },

  variants: {
    accent: {
      blue: {
        color: "var(--blue-11)",
        ":hover": {
          color: "var(--gray-a12)",
        },
        ":before": {
          backgroundColor: "var(--blue-11)",
        },
      },
      red: {
        color: "var(--red-11)",
        ":hover": {
          color: "var(--red-a12)",
        },
        ":before": {
          backgroundColor: "var(--red-11)",
        },
      },
    },
    size: {
      sm: {
        vars: {
          [spacingX]: ".4rem",
          [spacingY]: ".2rem",
        },
      },
      default: {
        vars: {
          [spacingX]: ".5rem",
          [spacingY]: ".3rem",
        },
      },
    },

    underline: {
      true: {
        "::before": {
          width: `calc(100% - (2 * ${spacingX}))`,
          bottom: spacingY,
          left: spacingX,
          height: "2px",
        },
      },
      false: {
        selectors: {
          "&:hover::before": {
            transform: "translate(0,-50%)",
          },
        },
        "::before": {
          width: 0,
          left: "50%",
          top: "50%",
          height: "0px",
        },
      },
    },
  },
});
