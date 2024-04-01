import PropType from "prop-types";
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { themeSettings } from "../theme";
import { useDispatch, useSelector } from "react-redux";
import userAvatar from "../assets/userAvatar.jpg";

const ProfilePage = () => {
  const [formData, setFormData] = useState({});
  const { palette } = useTheme(themeSettings);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/auth/register", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return console.log(data.message);
      }
      if (res.ok) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
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
          <Box
            sx={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <img
              src={userAvatar}
              rel="user image"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        </Box>
        <form onSubmit={handleSubmit}>
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
              onChange={handleChange}
              id="firstName"
              name="firstName"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Last Name"
              onChange={handleChange}
              id="lastName"
              name="lastName"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Height"
              onChange={handleChange}
              id="height"
              name="height"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Weight"
              onChange={handleChange}
              id="weight"
              name="weight"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Location"
              onChange={handleChange}
              id="location"
              name="location"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Position"
              onChange={handleChange}
              id="position"
              name="position"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Email"
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
            <TextField
              label="Confirm Password"
              type="password"
              onChange={handleChange}
              id="confirmPassword"
              name="confirmPassword"
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS */}
          <Box display="flex" justifyContent="space-between">
            <Button
              fullWidth
              type="submit"
              sx={{
                width: "25%",
                m: "2rem 0",
                p: "1rem",
                backgroundColor: "red",
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              DELETE
            </Button>
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
      </Box>
    </Box>
  );
};

export default ProfilePage;
