import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Porfile from "./pages/Profile"
import Games from "./pages/Games"
import Blog from "./pages/Blog"


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lgoin" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/profile" element={<Porfile />} />
          <Route path="/games" element={<Games />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>   
    </BrowserRouter>

  )
}
