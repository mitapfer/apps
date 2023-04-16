import React from "react";
import { useStyles } from "./styles";

export const ErrorMessage = (props) => {
  const { statusCode } = props;

  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <h3 className={classes.title}>:(</h3>

      <div className={classes.description}>
        {statusCode === 104 ? "Упс, кажется вы превысили месячный лимит запросов..." : "Упс, что-то пошло не так..."}
      </div>
    </div>
  );
};