import { useState } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import LoginForm from "../components/LoginForm";



const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          HoopsConnect
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        {errorMessage ? <Typography color="red" fontWeight="500" variant="h5" sx={{ mb: "1.5rem"}}>
          {errorMessage}
        </Typography> : <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcom to Hoops Connect!
        </Typography>}
        <LoginForm errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>

      </Box>
    </Box>
  );
};

export default LoginPage;