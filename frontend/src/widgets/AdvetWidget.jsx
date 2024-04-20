import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../components/FlexBetween.jsx";
import WidgetWrapper from "../components/WidgetWrapper.jsx";
import basketball from "../assets/basketball.jpg";

const AdvetWidget = () => {

  const { palette } = useTheme();
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  return (
    <WidgetWrapper mb="1rem">
      <FlexBetween>
        <Typography color={main} variant="h5" fontWeight="500">
          ADVERTISEMENT
        </Typography>
        <Typography color={medium} variant="h6" fontWeight="500">
          Create Ad
        </Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={basketball}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
    </WidgetWrapper>
  );
};

export default AdvetWidget;
