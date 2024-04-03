import { Link } from "react-router-dom";
import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../components/FlexBetween.jsx";
import WidgetWrapper from "../components/WidgetWrapper.jsx";
import bbgame from '../assets/bbgame.jpg';

const AdvetWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;


  return (
    <WidgetWrapper >
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          GAME LINKS
        </Typography>
        {/* <Typography color={medium}>Create Ad</Typography> */}
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={bbgame}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>NBA</Typography>
        <Typography color={medium}><Link to='https://www.nba.com/' target="_blank">nba.com</Link></Typography>
      </FlexBetween>
      <FlexBetween>
        <Typography color={main}>ESPN</Typography>
        <Typography color={medium}><Link to='https://www.espn.com/' target="_blank">espn.com</Link></Typography>
      </FlexBetween>
    </WidgetWrapper>
  )
}

export default AdvetWidget