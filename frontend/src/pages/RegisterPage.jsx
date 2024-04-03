import { Box, useTheme, useMediaQuery } from "@mui/material";
import RegisterWidget from "../widgets/RegisterWidget";

const RegisterPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="3rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <RegisterWidget />
      </Box>
    </Box>
  );
};

export default RegisterPage;
