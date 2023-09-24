/* eslint-disable react/prop-types */
import React from "react";

import CartHeader from "./CartHeader";
import Footter from "./Footter";

export default function CartLayout({ children }) {
  return (
    <div>
      <CartHeader />
      {children}
      <Footter />
    </div>
  );
}
