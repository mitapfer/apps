import React from "react";
import { Select } from "antd";
import { useStyles } from "./styles";

const SelectCustom: React.ElementType = (props: any) => {
  const { className, ...restProps } = props;

  useStyles();

  let classesCompose = "custom-select";

  if (className) {
    classesCompose += ` ${className}`;
  }

  return (
    <Select
      className={classesCompose}
      {...restProps}
    />
);
};

SelectCustom.Option = Select.Option;

export { SelectCustom };