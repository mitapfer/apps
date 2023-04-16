import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  "@global": {
    ".custom-btn": {
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent",
      border: "none",
      boxShadow: "none",
      borderRadius: 2,
      textTransform: "uppercase",
    },
    ".custom-btn-green": {
      backgroundColor: "#24bb72",
      color: "#fff",
      transition: "all .2s linear",

      "&:hover": {
        color: "#fff !important",
        backgroundColor: "#209d63",
      },
    }
  }
});