import React from "react";

import Footter from "../components/Footter";
import Header from "../components/Header";

// eslint-disable-next-line react/prop-types
export default function MainLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footter />
    </div>
  );
}
