import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "./context";
import useRouteElements from "./hooks/useRouteElements";

import { useContext, useEffect } from "react";

import { LocalStorageEventTartget } from "./utils/auth";

function App() {
  const rootElements = useRouteElements();
  const { reset } = useContext(AppContext);
  useEffect(() => {
    LocalStorageEventTartget.addEventListener("clearLS", reset);
    // khi componet destrouy, unmount thi la chay vao retrun
    return () => {
      LocalStorageEventTartget.removeEventListener("clearLS", reset);
    };
  }, [reset]);
  return (
    <div>
      {rootElements}
      <ToastContainer />
    </div>
  );
}

export default App;
