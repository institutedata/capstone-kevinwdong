import PropTypes from "prop-types";
import { Box, Typography, useTheme } from "@mui/material";

import FlexBetween from "./FlexBetween";
import UserImage from "./UserAvatar";


const Friend = ({ name, subtitle, userImage }) => {
 

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userImage} size="50px" />
        <Box>
          <Typography color={main} variant="h5" fontWeight="500">
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

Friend.prototype = {
  friendId: PropTypes.string,
  name: PropTypes.string,
  subtitle: PropTypes.string,
  userImage: PropTypes.string,
};

export default Friend;
