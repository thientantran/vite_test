import React from "react";

import Footter from "../components/Footter";
import RegisterHeader from "../components/RegisterHeader";

// eslint-disable-next-line react/prop-types
export default function RegisterLayout({ children }) {
  return (
    <div>
      <RegisterHeader />
      {children}
      <Footter />
    </div>
  );
}
