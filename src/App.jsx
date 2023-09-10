import "./App.css";
import useRouteElements from "./hooks/useRouteElements";

function App() {
  const rootElements = useRouteElements();
  return <div>{rootElements}</div>;
}

export default App;
