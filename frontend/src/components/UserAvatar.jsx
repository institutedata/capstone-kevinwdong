import PropType from "prop-types";
import { Box } from "@mui/material";

const UserAvatar = ({ userImage, size }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={userImage}
      />
    </Box>
  );
};

UserAvatar.propTypes = {
  userImage: PropType.string,
  size: PropType.string,
};

export default UserAvatar;