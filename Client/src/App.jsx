import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import AppRoutes from "./components/AppRoutes";
import "./App.css";

function App() {
    const [ logStatus, setLogStatus ] = useState(false);

  return (
    <BrowserRouter>
      <NavBar logStatus={logStatus} setLogStatus={setLogStatus}/>
      <AppRoutes logStatus={logStatus} setLogStatus={setLogStatus} />
    </BrowserRouter>
  );
}
export default App;
