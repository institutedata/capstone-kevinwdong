import { Box, useTheme, useMediaQuery } from "@mui/material";
import LandingWidget from "../widgets/LandingWidget";

const LandingPage = () => {

 const theme = useTheme();
const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
 
    return (
      <Box mt={isNonMobileScreens ? "25rem" : "10rem"}>
        <Box
          width={isNonMobileScreens ? "50%" : "93%"}
          p="2rem"
          m="3rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
        >
          <LandingWidget />
        </Box>
      </Box>

  )
}

export default LandingPage