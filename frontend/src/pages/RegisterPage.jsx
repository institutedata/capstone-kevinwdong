
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import RegisterForm from "../components/RegisterForm";


const RegisterPage = () => {
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
          Welcom to Hoops Connect!
        </Typography>
        <RegisterForm />
      </Box>
    </Box>
  );
};

export default RegisterPage;