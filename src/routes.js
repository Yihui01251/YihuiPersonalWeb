// src/routes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutMe from "./pages/AboutMe";
import Portfolio from "./pages/Portfolio";
import LearningNote from "./pages/LearningNote";
import Header from "./component/Header";
import Footer from "./component/Footer";

const AppRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/YihuiPersonalWeb" element={<Home />} />
        <Route path="/aboutMe" element={<AboutMe />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/learningNote" element={<LearningNote />} />
      </Routes>
      <Footer />
    </>

  );
};

export default AppRoutes;
