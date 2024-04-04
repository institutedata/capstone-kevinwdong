import PropTypes from "prop-types";
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  useTheme,
  Alert,
} from "@mui/material";
import { setUpdate, setDelete } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import userAvatar from "../assets/userAvatar.jpg";
import WidgetWrapper from "../components/WidgetWrapper";
import FlexBetween from "../components/FlexBetween";

const ProfileWidget = () => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { user, token } = useSelector((state) => state.user);

  const { palette } = useTheme();
  const main = palette.neutral.main;



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
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

  return (
    <WidgetWrapper mb='1rem'>
          <Box display="flex" justifyContent="center" mb={3} mx={3}>
            <Box

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
            <Box mt={3}>{error && <Alert severity="error">{error}</Alert>}</Box>

            <FlexBetween>
               <Button
                fullWidth
                onClick={handleDelete}
                type="submit"
                sx={{
                  width: "25%",
                  m: "2rem 0",
                  p: "1rem",                 
                  color: 'red',
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
                  backgroundColor: '#c84117',
                  color: main,
                }}
              >
                UPDATE
              </Button>
            </FlexBetween>
          </form>
    </WidgetWrapper>
  );
};

ProfileWidget.propTypes = {
  editProfile: PropTypes.bool.isRequired,
  setEditProfile: PropTypes.func.isRequired,
};

export default ProfileWidget;
