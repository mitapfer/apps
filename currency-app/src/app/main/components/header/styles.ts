import { createUseStyles } from "react-jss";
import { $colors } from "@styles/antModifyVars";

export const useStyles = createUseStyles({
  wrapper: {
    backgroundColor: "#ebf4fe",
    width: "100%",
    padding: "10px 0",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    "& img": {
      height: 38,
    }
  },
  links: {
    display: "flex",
    alignItems: "center",
  },
  linkItem: {
    marginRight: 20,

    "&:last-child": {
      marginRight: 0,
    }
  },
  linkItemActive: {
    color: `${$colors.primary} !important`,
  },
});