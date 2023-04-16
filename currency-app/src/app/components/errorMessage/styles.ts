import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 60,
    textAlign: "center",
  },
  description: {
    fontSize: 35,
  }
});