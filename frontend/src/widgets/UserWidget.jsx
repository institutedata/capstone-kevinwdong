import PropType from "prop-types";
import { useState, useEffect} from "react";
import {
  ManageAccountsOutlined,
  EditOutlined,
  Height,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import WidgetWrapper from "../components/WidgetWrapper.jsx";
import FlexBetween from "../components/FlexBetween.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserImage from "../components/UserImage.jsx";
import FacebookIcon from "@mui/icons-material/Facebook";


const UserWidget = ({ userId }) => {
  const [user, setUser] = useState({});
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;  

  const getUser = async () => {
    const response = await fetch(`http://localhost:8080/users/${userId}`, {
      method: "GET",
      headers: { Authorization: token },
    });
    const data = await response.json();
      setUser(data);
      console.log(data);
  };

  useEffect(() => {
    getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <WidgetWrapper>
 
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${user._id}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={user.userImage} size="40px" />
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
              {user.firstName} {user.lastName}
            </Typography>
            <Typography color={medium}>
             friends
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
          <Typography color={medium}>{user.location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <Typography color={medium}>Position:</Typography>
          <Typography color={medium}>{user.position}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <Typography color={medium}>Height:</Typography>
          <Typography color={medium}>{user.height}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <Typography color={medium}>Weight:</Typography>
          <Typography color={medium}>{user.weight}</Typography>
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

UserWidget.propTypes = {
  userId: PropType.string,
  userImage: PropType.string,
};


export default UserWidget;
