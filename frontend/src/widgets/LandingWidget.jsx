import { Box, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./LandingWidget.css";

const HoopsConnect = () => {

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();


  return (
    <Box className="container">
      <Box className="logoBack"></Box>
      <Box className="logoFront">
        <Typography
          onClick={() => navigate("/login")}
          className="logo"
          color="#c84117"
          fontSize="8rem"
          fontWeight="800"
          sx={{ mb: "1.5rem" }}
        >
          SC
        </Typography>
      </Box>
    </Box>
  );
};

export default HoopsConnect;
