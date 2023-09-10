import { ToastContainer } from "react-toastify";

import useRouteElements from "./hooks/useRouteElements";

function App() {
  const rootElements = useRouteElements();
  return (
    <div>
      {rootElements}
      <ToastContainer />
    </div>
  );
}

export default App;
