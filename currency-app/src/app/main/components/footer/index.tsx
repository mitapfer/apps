import React from "react";
import { useStyles } from "./styles";

export const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className="container">
        <div className={classes.content}>
          <div className={classes.linkItem}>
            Created by: <a href="https://github.com/mitapfer" target="_blank">Mikhail</a>
          </div>
          <div className={classes.linkItem}>
            <a href="https://fixer.io" target="_blank">API</a>
          </div>
        </div>
      </div>
    </div>
  );
};