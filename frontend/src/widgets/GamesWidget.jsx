import { Box, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "../components/WidgetWrapper.jsx";



const GamesWidget = () => {
  const { palette } = useTheme();
  const getGames = async () => {
    
  };
  getGames();

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Ongoing Games
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
       Games List here
      </Box>
    </WidgetWrapper>
  );
};

export default GamesWidget;