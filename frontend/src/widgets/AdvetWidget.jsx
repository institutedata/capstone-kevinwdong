import { useState, useEffect } from "react";
import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../components/FlexBetween.jsx";
import WidgetWrapper from "../components/WidgetWrapper.jsx";

const AdvetWidget = () => {
  // const [randomImageUrl, setRandomImageUrl] = useState("");

  const { palette } = useTheme();
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     fetch("https://source.unsplash.com/featured/?sports").then((response) => {
  //       setRandomImageUrl(response.url);
  //       console.log("Random basketball image URL:", response.url);
  //     });
  //   }, 5000);

  //   return () => clearInterval(intervalId);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
        // src={randomImageUrl}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
    </WidgetWrapper>
  );
};

export default AdvetWidget;
