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
import { setUpdate, setDelete, setLogout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { themeSettings } from "../theme";
import { useDispatch, useSelector } from "react-redux";

import userAvatar from "../assets/userAvatar.jpg";

const ProfilePage = () => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { palette } = useTheme(themeSettings);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { user, token } = useSelector((state) => state.user);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    setError(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/users/update/${user._id}`,
        {
          method: "PUT",
          headers: {
            Authorisation: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
      } else {
        dispatch(setUpdate(data));
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/users/delete/${user._id}`,
        {
          method: "DELETE",
          headers: {
            Authorisation: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
      } else {
        dispatch(setDelete());
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`http://localhost:8080/users/logout`, {
        method: "POST",
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
      } else {
        dispatch(setLogout());
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
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
                defaultValue={user.firstName}
                onChange={handleChange}
                id="firstName"
                name="firstName"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Last Name"
                defaultValue={user.lastName}
                onChange={handleChange}
                id="lastName"
                name="lastName"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Height"
                defaultValue={user.height}
                onChange={handleChange}
                id="height"
                name="height"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Weight"
                defaultValue={user.weight}
                onChange={handleChange}
                id="weight"
                name="weight"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Location"
                defaultValue={user.location}
                onChange={handleChange}
                id="location"
                name="location"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Position"
                defaultValue={user.position}
                onChange={handleChange}
                id="position"
                name="position"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Email"
                defaultValue={user.email}
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
            <Box mt={3}>
              {error && <Alert severity="error">{error}</Alert>}
            </Box>

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
