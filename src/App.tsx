import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import NotFound from "./pages/NotFound";
import Contacts from "./pages/Contact";
import ChartsMaps from "./pages/ChartsMaps";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route path="/" element={<Contacts />} />
        <Route path="/charts-and-maps" element={<ChartsMaps />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
