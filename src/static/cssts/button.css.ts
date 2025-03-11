import { recipe } from "@vanilla-extract/recipes";
import { createVar, style } from "@vanilla-extract/css";

const spacingY = createVar();
const spacingX = createVar();

const textColor = createVar();
const textInverseColor = createVar();
const bgColor = createVar();
const borderColor = createVar();

export const button = recipe({
  defaultVariants: {
    size: "default",
    variant: "default",
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
  },

  variants: {
    accent: {
      blue: {
        vars: {
          [textColor]: "var(--blue-11)",
          [textInverseColor]: "var(--gray-a12)",
          [bgColor]: "var(--blue-3)",
          [borderColor]: "var(--blue-6)",
        },
      },
      red: {
        vars: {
          [textColor]: "var(--red-11)",
          [textInverseColor]: "var(--gray-a12)",
          [bgColor]: "var(--red-3)",
          [borderColor]: "var(--red-6)",
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
          [spacingX]: ".75rem",
          [spacingY]: ".3rem",
        },
      },
    },
    variant: {
      default: {
        color: textColor,
        borderRadius: "0.25rem",
        ":hover": {
          backgroundColor: bgColor,
        },
      },
      subtle: {
        color: textColor,
        borderRadius: "0.25rem",
        ":hover": {
          backgroundColor: bgColor,
          outline: `1px solid ${borderColor}`,
        },
      },

      // TODO define blue-inverse
      underline: {
        color: textColor,
        ":hover": {
          color: textInverseColor,
        },
        "::before": {
          transition: "all 0.1s ease-in-out",
          content: '""',
          zIndex: -1,
          position: "absolute",

          width: `calc(100% - (2 * ${spacingX}))`,
          bottom: spacingY,
          left: spacingX,
          height: "2px",
          backgroundColor: textColor,
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
    },
  },
});
