import { createUseStyles } from "react-jss";
import { $colors } from "@styles/antModifyVars";
import converterBc from "@assets/images/converter-bc.png";
import backgroundTop from "@assets/images/background.png";

export const useStyles = createUseStyles({
  top: {
    backgroundColor: $colors.primary,
    backgroundImage: `url(${backgroundTop})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%",
    height: "calc(50vh - 63px)",
    minHeight: 300,
    paddingTop: 50,

    "& .container": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
    },
  },
  title: {
    color: "#fff",
    fontSize: 65,
  },
  converterWrapper: {
    display: "flex",
    margin: "40px 0 20px 0",

    "& .ant-form-item": {

      boxShadow: "0px 10px 10px 0px rgba(255, 255, 255, 0.2)",
    },
    "& input": {
      fontWeight: 600,
    },
    "& button": {
      fontWeight: 500,
      boxShadow: "0px 10px 10px 0px rgba(255, 255, 255, 0.2)",
      borderTopLeftRadius: "initial",
      borderBottomLeftRadius: "initial",
    }
  },
  bottom: {
    paddingTop: 20,
    height: "calc(50vh - 70px)",
    backgroundImage: `url(${converterBc})`,
    backgroundSize: "cover",
  },
  convertResult: {
    fontSize: 30,
    textAlign: "center",

    "& b": {
      fontSize: 40,
      color: "#0052cc",
    }
  },
  nothingResult: {
    color: "#ccc",
    fontSize: 18,
  }
});