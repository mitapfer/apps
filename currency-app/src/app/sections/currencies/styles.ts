import { createUseStyles } from "react-jss";
import converterBc from "@assets/images/converter-bc.png";
import { $colors } from "@styles/antModifyVars";

export const useStyles = createUseStyles({
  wrapper: {
    width: "100%",
    backgroundImage: `url(${converterBc})`,
    height: "calc(100vh - 63px)",
  },
  title: {
    fontSize: 50,
    paddingTop: 50,

    "&::first-letter": {
      color: $colors.primary,
    }
  },
  content: {
    marginTop: 50,
  },
  left: {
    display: "flex",
    alignItems: "center",
  },
  leftSelect: {
    width: 320,
  },
  cards: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 20,
  },
  card: {
    width: "50%",

    "&:nth-child(odd)": {
      marginLeft: -10,
    },
  },
  cardContent: {
    display: "flex",
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
  },
  cardInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 15,
  },
  cardImg: {
    height: 70,
    maxWidth: 105,

    "& img": {
      width: "100%",
    },
  },
  cardCountryCode: {
    fontWeight: 600,
    fontSize: 20,
  },
  cardCourse: {
    fontSize: 25,
    color: $colors.primary,
  },
  cardsSpinner: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginTop: 50,
  },
});