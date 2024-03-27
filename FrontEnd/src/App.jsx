import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import AppRoutes from "./components/AppRoutes";
import './App.css';

function App() {
  return (
    <div className='bg'>
    <BrowserRouter>
      <NavBar />
      <AppRoutes />
    </BrowserRouter>
    </div>
  );
}
export default App;
