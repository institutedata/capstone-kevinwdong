import PropType from "prop-types";
import { Box } from "@mui/material";

const UserAvatar = ({ image, size }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={image}
      />
    </Box>
  );
};

UserAvatar.propTypes = {
  imageURL: PropType.string,
  size: PropType.string,
};

export default UserAvatar;