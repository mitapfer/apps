import React from "react";
import { useMainStyles } from "../styles";
import { Main } from "./main";
import { ConfigProvider } from "antd";
import { modifyVars } from "@styles/antModifyVars";

export const App = () => {
  useMainStyles();

  return (
    <ConfigProvider
      theme={modifyVars}
    >
      <Main />
    </ConfigProvider>
  );
};