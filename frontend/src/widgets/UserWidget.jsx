import {
  ManageAccountsOutlined,
  EditOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import WidgetWrapper from "../components/WidgetWrapper.jsx";
import FlexBetween from "../components/FlexBetween.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserImage from "../components/UserImage.jsx";
import userAvatar from '../assets/userAvatar.jpg';
import FacebookIcon from "@mui/icons-material/Facebook";


const UserWidget = () => {
  // const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  // const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  // const getUser = async () => {
  //   const response = await fetch(`http://localhost:3001/users/${userId}`, {
  //     method: "GET",
  //     headers: { Authorization: token },
  //   });
  //   const currentUser = await response.json();
  //   setUser(currentUser)
  // };


  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${currentUser.user._id}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={userAvatar} size="40px" />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {currentUser.firstName} {currentUser.lastName}
            </Typography>
            <Typography color={medium}>
              {currentUser.friends.length} friends
            </Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <Typography color={medium}>Location:</Typography>
          <Typography color={medium}>{currentUser.location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <Typography color={medium}>Position:</Typography>
          <Typography color={medium}>{currentUser.position}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <Typography color={medium}>Height:</Typography>
          <Typography color={medium}>{currentUser.location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <Typography color={medium}>Weight:</Typography>
          <Typography color={medium}>{currentUser.position}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
          <FacebookIcon />
            <Box>
              <Typography color={main} fontWeight="500">
                TikTok
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <FacebookIcon />
            <Box>
              <Typography color={main} fontWeight="500">
                Facebook
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
