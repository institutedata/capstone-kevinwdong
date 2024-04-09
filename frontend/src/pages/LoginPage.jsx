import { Box, useTheme, useMediaQuery } from "@mui/material";
import LoginWidget from "../widgets/LoginWidget";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width={isNonMobileScreens ? "30%" : "93%"}
        p="2rem"
        m="3rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <LoginWidget />
      </Box>
    </Box>
  );
};

export default LoginPage;
