import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Converter } from "../sections/converter";
import { Currencies } from "../sections/currencies";
import { Header } from "./components/header";
import { Footer} from "./components/footer";
import { BASE_PATHS } from "@constants/paths";

export const Main = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Navigate to={BASE_PATHS.CONVERTER} />} />
        <Route path={BASE_PATHS.CONVERTER} element={<Converter />} />
        <Route path={BASE_PATHS.CURRENCIES} element={<Currencies />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};