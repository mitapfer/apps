import React from "react";
import { useStyles } from "./styles";
import logo from "@assets/images/logo.png";
import { Link, NavLink } from "react-router-dom";
import { BASE_PATHS } from "@constants/paths";

export const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className="container">
        <div className={classes.content}>
          <div className={classes.logo}>
            <Link to={BASE_PATHS.CONVERTER}>
              <img src={logo} alt="logo" />
            </Link>
          </div>

          <div className={classes.links}>
            <div className={classes.linkItem}>
              <NavLink to={BASE_PATHS.CONVERTER} className={({ isActive }) => isActive ? classes.linkItemActive : ""}>
                Конвертирование
              </NavLink>
            </div>
            <div className={classes.linkItem}>
              <NavLink to={BASE_PATHS.CURRENCIES} className={({ isActive }) => isActive ? classes.linkItemActive : ""}>
                Курсы валют
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};