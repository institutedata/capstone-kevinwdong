import { Box, useTheme, useMediaQuery } from "@mui/material";
import LoginWidget from "../widgets/LoginWidget";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <LoginWidget />
        {/* <LoginForm /> */}
      </Box>
    </Box>
  );
};

export default LoginPage;
