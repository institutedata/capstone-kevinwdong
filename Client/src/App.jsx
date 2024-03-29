
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import AppRoutes from "./components/AppRoutes";
import "./App.css";
import Footer from "./components/Footer";

function App() {
    

  return (
    <BrowserRouter>
      <NavBar />
      <AppRoutes />
       <Footer  />
    </BrowserRouter>
  );
}
export default App;
