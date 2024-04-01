import { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { themeSettings } from "../theme";
import { useDispatch, useSelector } from "react-redux";
import { updateStart, updateSuccess, updateFailure } from "../redux/userSlice";
import userAvatar from "../assets/userAvatar.jpg";

const ProfilePage = () => {
  const { error: errorMessage } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { palette } = useTheme(themeSettings);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const chooseImageRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateStart());
    if (formData.password !== formData.confirmPassword) {
      dispatch(updateFailure("Passwords do not match"));
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
        dispatch(updateFailure(data.message));
      }
      if (res.ok) {
        dispatch(updateSuccess(data));
        navigate("/profile");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
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
          <input
            type="file"
            accept="image/*"
            id="avatar"
            onChange={handleImageChange}
            ref={chooseImageRef}
            hidden
          />
          <Box
            onClick={() => chooseImageRef.current.click()}
            sx={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              overflow: "hidden",
              "&:hover": { cursor: "pointer" },
            }}
          >
            <img
              src={imageFileUrl || userAvatar}
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
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
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
