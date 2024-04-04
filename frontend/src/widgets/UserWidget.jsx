import PropType from "prop-types";
import { ManageAccountsOutlined} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, IconButton } from "@mui/material";
import WidgetWrapper from "../components/WidgetWrapper.jsx";
import FlexBetween from "../components/FlexBetween.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserAvatar from "../components/UserAvatar.jsx";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import PublishIcon from "@mui/icons-material/Publish";

const UserWidget = ({ editProfile, setEditProfile }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const totalGames = user.totalGames;
  const totalPoints = user.totalPoints;



  const { palette } = useTheme();
  const main = palette.neutral.main;

  const handleupdate = () => {
    setEditProfile(!editProfile);
  };

  return (
    <WidgetWrapper mb="1rem">
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate("/profile")}
      >
        <FlexBetween gap="1rem">
          <UserAvatar userImage={user.userImage} size="40px" />
          <Box>
            <Typography
              color={main}
              variant="h5"
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {user.firstName} {user.lastName}
            </Typography>
          </Box>
        </FlexBetween>
        <IconButton onClick={handleupdate}>
          <ManageAccountsOutlined />
        </IconButton>
      </FlexBetween>

      <Divider />

      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnIcon />
          <Typography color={main} variant="h5" fontWeight="500">
            {user.location}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <SportsBasketballIcon />
          <Typography color={main} variant="h5" fontWeight="500">
            {user.position}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <PublishIcon />
          <Typography color={main} variant="h5" fontWeight="500">
            {user.height}{user.height && " cm"}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <MonitorWeightIcon />
          <Typography color={main} variant="h5" fontWeight="500">
            {user.weight}{user.weight && " lbs"}
          </Typography>
        </Box>
      </Box>

      <Divider />

      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Game Stats
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <Typography color={main} variant="h5" fontWeight="500">
            Total Games
          </Typography>
          <Typography color={main} variant="h5" fontWeight="500">
            {totalGames}
          </Typography>
        </FlexBetween>

        <FlexBetween gap="1rem">
          <Typography color={main} variant="h5" fontWeight="500">
            Total Points
          </Typography>
          <Typography color={main} variant="h5" fontWeight="500">
            {totalPoints}
          </Typography>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

UserWidget.propTypes = {
  userId: PropType.string,
  userImage: PropType.string,
  editProfile: PropType.bool,
  setEditProfile: PropType.func,
};

export default UserWidget;
