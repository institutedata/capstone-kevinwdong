import { Link } from "react-router-dom";
import { Typography, useTheme, Box } from "@mui/material";
import WidgetWrapper from "../components/WidgetWrapper.jsx";
import trophy from "../assets/trophy.png";


const GameLinWidget = () => {
  const { palette } = useTheme();
  const main = palette.neutral.main;


  return (
    <WidgetWrapper mb="1rem">
      <Box><Link to="https://www.nba.com/" target="_blank">
        <img
          width="100%"
          height="auto"
          alt="advert"
          src={trophy}
          style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
        /></Link>
      </Box>
      <Box display='flex' justifyContent='center'>
        <Typography color={main} variant="h5" fontWeight="500">
          2023 -2024
        </Typography>
      </Box>
    </WidgetWrapper>
  );
};

export default GameLinWidget;
