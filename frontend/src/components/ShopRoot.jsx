import { styled } from "@mui/material/styles";

export const ShopRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 0,
  [theme.breakpoints.up("md")]: {
  },
}));
