// import {styled}
import { styled } from "../stitches.config";
export const Button = styled("button", {
  bc: "$secondary",
  p: "$1 $2",
  borderRadius: 4,
  fontSize: 8,
  color: "white",
  variants: {
    selected: {
      true: {
        bc: "gray",
      },
      false: {
        bc: "transparent",
        color: "black",
      },
    },
    checked: {
      true: {
        bc: "$primary",
      },
    },
    full: {
      true: { width: "100%" },
    },
  },
});
