import { useEffect, useState } from "react";
import {
  Avatar,
  AppBar,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Switch from "@mui/material/Switch";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Search, DarkMode, LightMode } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMode } from "../redux/modeSlice";
import { setPostOrGame } from "../redux/modeSlice";
import { setLogout } from "../redux/userSlice";
import { clearPost } from "../redux/postSlice";
import { clearGame } from "../redux/gameSlice";
import FlexBetween from "../components/FlexBetween";
import UserAvatar from "../assets/userAvatar.jpg";

const Navbar = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [fullName, setFullName] = useState("");
  const [isLoggedin, setIsLoggedin] = useState("");
  const [avatarImage, setAvatarImage] = useState(UserAvatar);
  const { user, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const defaultUserImage = 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const alt = theme.palette.background.alt;
  const main = theme.palette.neutral.main;

  useEffect(() => {
    if (!token) {
      setFullName("Guest User");
      setIsLoggedin("Log In");
      setAvatarImage(defaultUserImage);
    } else {
      setFullName(`${user.firstName} ${user.lastName}`);
      setIsLoggedin("Log Out");
      setAvatarImage(user.userImage);
    }
  }, [token, user]);

  const handleLogging = async () => {
    if (!token) {
      navigate("/login");
    } else {
      dispatch(setLogout());
      dispatch(clearPost());
      dispatch(clearGame());
      navigate("/");
    }
  };

  const handleLogoClick = async () => {
    if (!token) {
      navigate("/");
    } else {
      navigate("/home");
    }

  };

  const handlePostOrGame = async () => {
    dispatch(setPostOrGame());
  };

  const handleGuestUser = async () => {
    if (!token) {
      navigate("/register");
    } else {
      navigate("/profile");
    }
  }

  const handlePorfile = async () => {
    if (!token) {
      navigate("/login");
    } else {
      navigate("/profile");
    }
  };

  return (
    <AppBar position="sticky">
      <FlexBetween padding="1rem 2%" backgroundColor={alt}>
        <FlexBetween gap="1.75rem" ml="2rem">
          {isNonMobileScreens ? (
            <>
              <Typography
                fontWeight="bold"
                fontSize="clamp(1rem, 2rem, 2.25rem)"
                color="#c84117"
                onClick={handleLogoClick}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                SportConnect
              </Typography>
              <FlexBetween
                backgroundColor={neutralLight}
                borderRadius="9px"
                gap="3rem"
                padding="0.1rem 1.5rem"
              >
                <InputBase placeholder="Search..." />
                <IconButton>
                  <Search />
                </IconButton>
              </FlexBetween>
            </>
          ) : (
            <>
              <Typography
                fontWeight="bold"
                fontSize="clamp(1rem, 2rem, 2.25rem)"
                color="#c84117"
                onClick={handleLogoClick}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                SC
              </Typography>
              <IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ color: dark, fontSize: "25px" }} />
                )}
              </IconButton>
            </>
          )}
        </FlexBetween>

        {isNonMobileScreens ? (
          <FlexBetween gap="2rem">
            <IconButton onClick={handlePostOrGame}>
              <Switch />
            </IconButton>
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>

            <FormControl variant="standard">
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName} onClick={handleGuestUser}>
                  <Typography color={main} variant="h5" fontWeight="500">
                    {fullName}
                  </Typography>
                </MenuItem>
                <MenuItem onClick={(handleLogging)}>
                  <Typography color={main} variant="h5" fontWeight="500">
                    {isLoggedin}
                  </Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        ) : (
          <FlexBetween gap="1rem" mr="2rem">
            <IconButton onClick={handlePostOrGame}>
              <Switch color="#c84117" />
            </IconButton>
            <IconButton onClick={handlePorfile}>
              <ManageAccountsIcon fontSize="large" />
            </IconButton>
            <Avatar
              alt="Remy Sharp"
              onClick={handleLogging}
              src={avatarImage}
              sx={{ width: 30, height: 30 }}
            />
          </FlexBetween>
        )}
      </FlexBetween>
    </AppBar>
  );
};

export default Navbar;
