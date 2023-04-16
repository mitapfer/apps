import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  wrapper: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "10px 0",
    backgroundColor: "#d7d7d7",
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#919191",
    fontSize: 14,

    "& a": {
      marginLeft: 5,
      color: "#919191",
      fontSize: 15,

      "&:hover": {
        color: "#696969",
      }
    }
  },
  linkItem: {
    marginRight: 20,

    "&:last-child": {
      marginRight: 0,
    }
  }
});