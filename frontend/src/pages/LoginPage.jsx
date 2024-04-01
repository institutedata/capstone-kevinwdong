import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import LoginForm from "../components/LoginForm";



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
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome Back !
        </Typography>
        <LoginForm />
      </Box>
    </Box>
  );
};

export default LoginPage;