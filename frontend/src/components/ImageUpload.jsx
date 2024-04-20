import PropType from "prop-types";
import { InputBase, useTheme } from "@mui/material";
import FlexBetween from "../components/FlexBetween.jsx";

const ImageUpload = ({ upload, setFile }) => {
  const { palette } = useTheme();

  return (
    <>
      {upload && (
        <FlexBetween gap="1.5rem" mt="1rem" mb="1rem">
          <InputBase
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            placeholder="Please choose image..."
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "0.5rem 1rem",
            }}
          />
        </FlexBetween>
      )}
    </>
  );
};

ImageUpload.propTypes = {
  upload: PropType.bool,
  setFile: PropType.func,
};

export default ImageUpload;
