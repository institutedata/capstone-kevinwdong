import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";

const LandingPage = () => {
  return (
    <Box display="flex" justifyItems="center">
      <Box
        height={600}
        width={800}
        my={4}
        display="flex"
        alignItems="center"
        gap={4}
        p={2}
        sx={{ border: "2px solid grey" }}
      >
        This is the Landing Page
      </Box>
      <Button variant="contained" color="primary">
        <NavLink to="/home">Enter Site</NavLink>
      </Button>
    </Box>
  );
};

export default LandingPage;
