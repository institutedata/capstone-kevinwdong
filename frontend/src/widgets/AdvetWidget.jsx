import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../components/FlexBetween.jsx";
import WidgetWrapper from "../components/WidgetWrapper.jsx";
import bbgame from '../assets/bbgame.jpg';

const AdvetWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;


  return (
    <WidgetWrapper mb='1rem'>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          ADVERTISEMENT
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={bbgame}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
    </WidgetWrapper>
  )
}

export default AdvetWidget