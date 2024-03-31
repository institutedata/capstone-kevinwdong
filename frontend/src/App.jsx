import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import LoginPage from "./pages/loginPage/LoginPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import LandingPage from "./pages/landingPage/LandingPage";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage /> }/>
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </div>
  )
}

export default App
