import PropType from "prop-types";
import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`http://localhost:8080/images/${image}`}
      />
    </Box>
  );
};

UserImage.propTypes = {
  image: PropType.string,
  size: PropType.string,
};

export default UserImage;