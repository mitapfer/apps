import { createUseStyles } from "react-jss";
import { $colors } from "@styles/antModifyVars";

export const useMainStyles = createUseStyles({
  "@global": {
    "@import": "url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,300&display=swap')",
    "body": {
      fontFamily: "Roboto, sans-serif",
      margin: 0,
    },
    "h1, h2, h3, h4, h5": {
      margin: 0,
    },
    ".container": {
      maxWidth: 1230,
      width: "100%",
      margin: "0 auto",
      padding: "0 15px",
    },
    "a": {
      color: "#333",
      textDecoration: "none",
      fontWeight: 500,
      fontSize: 18,
      transition: "all .2s linear",

      "&:hover": {
        color: $colors.primary,
      }
    },
    ".ant-form-item": {
      width: "100%",
    }
  }
});