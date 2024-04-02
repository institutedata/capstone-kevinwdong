import { Box, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "../components/WidgetWrapper.jsx";



const FriendListWidget = () => {
  const { palette } = useTheme();
  const getFriends = async () => {
    
  };
  getFriends();

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
       Friend List here
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;