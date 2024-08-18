import {BrowserRouter, Route, Routes} from "react-router-dom";
import { DefaultNotFound } from "@/utils/error/components/default-not-found.tsx";
import { MainPage } from "@/page/main-page";

export const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<DefaultNotFound />} />
        </Routes>
    </BrowserRouter>
  );
};
