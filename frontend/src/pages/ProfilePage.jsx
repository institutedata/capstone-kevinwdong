import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  Alert,
} from "@mui/material";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteStart,
  deleteSuccess,
  deleteFailure,
  logoutSuccess,
} from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { themeSettings } from "../theme";
import { useDispatch, useSelector } from "react-redux";

import userAvatar from "../assets/userAvatar.jpg";

const ProfilePage = () => {
  const { currentUser, error: errorMessage } = useSelector(
    (state) => state.user
  );
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { palette } = useTheme(themeSettings);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (Object.keys(formData).length === 0) {
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(
        `http://localhost:8080/users/update/${currentUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
      } else {
        dispatch(updateSuccess(data));
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteStart());
      const res = await fetch(
        `http://localhost:8080/users/delete/${currentUser._id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteFailure(data.message));
      } else {
        dispatch(deleteSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(deleteFailure(error.message));
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/users/logout`,
        {
          method: "POST",
        }
      );
      if (!res.ok) {
        console.log("Failed to logout");
      } else {
        dispatch(logoutSuccess());
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Box>
        <Box
          width={isNonMobileScreens ? "70%" : "93%"}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
        >
          <Box display="flex" justifyContent="space-between" mb={3} mx={3}>
            <Typography fontWeight="500" variant="h3" sx={{ mb: "1.5rem" }}>
              Profile
            </Typography>
            {/* <input
            type="file"
            accept="image/*"
            id="avatar"
            onChange={handleImageChange}
            ref={chooseImageRef}
            hidden
          /> */}
            <Box
              // onClick={() => chooseImageRef.current.click()}
              sx={{
                width: "100px",
                height: "100px",
                border: "5px solid #ccc",
                borderRadius: "50%",
                overflow: "hidden",
                "&:hover": { cursor: "pointer" },
              }}
            >
              <img
                src={userAvatar}
                rel="user image"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          </Box>
          <form onSubmit={handleUpdate}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                label="First Name"
                defaultValue={currentUser.firstName}
                onChange={handleChange}
                id="firstName"
                name="firstName"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Last Name"
                defaultValue={currentUser.lastName}
                onChange={handleChange}
                id="lastName"
                name="lastName"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Height"
                defaultValue={currentUser.height}
                onChange={handleChange}
                id="height"
                name="height"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Weight"
                defaultValue={currentUser.weight}
                onChange={handleChange}
                id="weight"
                name="weight"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Location"
                defaultValue={currentUser.location}
                onChange={handleChange}
                id="location"
                name="location"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Position"
                defaultValue={currentUser.position}
                onChange={handleChange}
                id="position"
                name="position"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Email"
                defaultValue={currentUser.email}
                onChange={handleChange}
                id="email"
                name="email"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Password"
                type="password"
                onChange={handleChange}
                id="password"
                name="password"
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            {/* BUTTONS */}
            <Box display="flex" justifyContent="end">
              <Button
                fullWidth
                type="submit"
                sx={{
                  width: "25%",
                  m: "2rem 0",
                  p: "1rem",
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  "&:hover": { color: palette.primary.main },
                }}
              >
                UPDATE
              </Button>
            </Box>
          </form>
          <Box display="flex" justifyContent="space-between">
            <Typography
              onClick={handleDelete}
              sx={{
                textDecoration: "underline",
                color: "red",
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              DELETE ACCOUNT
            </Typography>
            <Typography
              onClick={handleLogout}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              LOGOUT
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProfilePage;
