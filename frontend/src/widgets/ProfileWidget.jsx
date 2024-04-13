import PropTypes from "prop-types";
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  useTheme,
  Alert,
  Tooltip,
} from "@mui/material";
import { setUpdate, setDelete } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import WidgetWrapper from "../components/WidgetWrapper";
import FlexBetween from "../components/FlexBetween";
import ImageUpload from "../components/ImageUpload";
import UserAvatar from "../components/UserAvatar";

const ProfileWidget = ({ userImage }) => {
  const [error, setError] = useState(null);
  const [file, setFile] = useState();
  const [upload, setUpload] = useState(false);
  const [profileData, setProfileData] = useState({});
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { user, token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { palette } = useTheme();
  const main = palette.neutral.main;

  const deltelText = (
    <h2>
      By clicking the delete button, you will delete your account and all the
      data associated with it. Are you sure you want to delete your account?
    </h2>
  );

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.id]: e.target.value.trim() });
    setError(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (Object.keys(profileData).length === 0) {
      return;
    }
    try {
      const formData = new FormData();

      Object.entries(profileData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.append("file", file);

      const response = await fetch(
        `http://localhost:8080/users/update/${user._id}`,
        {
          method: "PATCH",
          headers: {
            Authorisation: token,
          },
          body: formData,
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
      await fetch(`http://localhost:8080/games/delete/${user._id}/games`, {
        method: "DELETE",
        headers: {
          Authorisation: token,
        },
      });

      await fetch(`http://localhost:8080/posts/delete/${user._id}/posts`, {
        method: "DELETE",
        headers: {
          Authorisation: token,
        },
      });
      await fetch(`http://localhost:8080/users/delete/${user._id}`, {
        method: "DELETE",
        headers: {
          Authorisation: token,
        },
      });

        dispatch(setDelete());
        navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <WidgetWrapper mb="1rem">
      <Box display="flex" justifyContent="center" mb={3} mx={3}>
        <Box
          onClick={() => setUpload(!upload)}
          sx={{
            width: "100px",
            height: "100px",
            border: "5px solid #ccc",
            borderRadius: "50%",
            overflow: "hidden",
            "&:hover": { cursor: "pointer" },
          }}
        >
          <UserAvatar userImage={userImage} size="90px" />
        </Box>
      </Box>
      <ImageUpload upload={upload} setFile={setFile} />
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
          <Tooltip title={deltelText}>
            <Button
              fullWidth
              onClick={handleDelete}
              type="submit"
              sx={{
                width: "25%",
                m: "2rem 0",
                p: "1rem",
                color: "red",
              }}
            >
              DELETE
            </Button>
          </Tooltip>
          <Button
            fullWidth
            type="submit"
            sx={{
              width: "25%",
              m: "2rem 0",
              p: "1rem",
              backgroundColor: "#c84117",
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
  userImage: PropTypes.string,
  editProfile: PropTypes.bool.isRequired,
  setEditProfile: PropTypes.func.isRequired,
};

export default ProfileWidget;
