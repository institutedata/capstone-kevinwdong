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
import Switch from '@mui/material/Switch';
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
import userAvatar from "../assets/userAvatar.jpg";

const Navbar = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [fullName, setFullName] = useState("");
  const [isLoggedin, setIsLoggedin] = useState("");
  const [avatarImage, setAvatarImage] = useState("");
  const { user, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  useEffect(() => {
    if (!token) {
      setFullName("Guest User");
      setIsLoggedin("Log In");
      setAvatarImage("/broken-image.jpg");
    } else {
      setFullName(`${user.firstName} ${user.lastName}`);
      setIsLoggedin("Log Out");
      setAvatarImage(userAvatar);
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

  const handlePostOrGame = async () => {
    dispatch(setPostOrGame());
  };


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
              color="primary"
              onClick={() => navigate("/home")}
              sx={{
                "&:hover": {
                  color: primaryLight,
                  cursor: "pointer",
                },
              }}
            >
              HoopsConnect
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
              color="primary"
              onClick={() => navigate("/home")}
              sx={{
                "&:hover": {
                  color: primaryLight,
                  cursor: "pointer",
                },
              }}
            >
              HC
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

      {/* DESKTOP NAV */}
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
              <MenuItem value={fullName} onClick={() => navigate('/profile')}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogging}>{isLoggedin}</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <FlexBetween gap="1rem" mr="2rem">
          <IconButton onClick={handlePostOrGame}>
            <Switch />
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
