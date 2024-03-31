import { Box } from "@mui/material";
import { styled } from "@mui/system";


//@desc     This is a styled component that is used to create a flex container that has space between the children. It can be reused in other components.
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;