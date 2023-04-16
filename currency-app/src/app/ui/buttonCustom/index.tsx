import React from "react";
import { Button } from "antd";
import { useStyles } from "./styles";

export const ButtonCustom = (props) => {
  const { className, fullWidth, type, antType, size, withIcon, ...restProps } = props;

  useStyles();

  let classesCompose = "custom-btn";

  if (className) {
    classesCompose += ` ${className}`;
  }

  if (type) {
    classesCompose += ` custom-btn-${type}`;
  }

  if (fullWidth) {
    classesCompose += " full-width";
  }

  if (size) {
    classesCompose += ` custom-btn-${size}`;
  }

  if (withIcon) {
    classesCompose += " custom-btn-with-icon";
  }

  return <Button type={antType} className={classesCompose} {...restProps} />;
};