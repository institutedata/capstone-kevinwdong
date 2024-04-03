import { useNavigate } from "react-router-dom";
import { Box, useMediaQuery, Typography } from "@mui/material";

const PageNotFound = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexBasis={isNonMobileScreens ? "80%" : undefined}
      mt="10rem"
    >
      <Typography fontWeight="500" variant="h5" onClick={() => navigate(-1)}>
        404 Page Not Found
      </Typography>
    </Box>
  );
};

export default PageNotFound;
