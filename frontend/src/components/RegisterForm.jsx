import PropType from "prop-types";
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { themeSettings } from "../theme";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// import { useDispatch } from "react-redux";
// import { setLogin } from "../state/index";
import Dropzone from "react-dropzone";
import FlexBetween from "../components/FlexBetween";






const RegisterForm = ({ setErrorMessage }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [position, setPosition] = useState("");
  const [userImage, setUserImage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { palette } = useTheme(themeSettings);

  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrorMessage("Passwords do not match");
    }

    try {
      const res = await fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          location,
          position,
          email,
          password,
        }),
      });
      console.log(firstName, lastName, location, position, email, password);
      const data = await res.json();
      if (data.error) {
        setErrorMessage(data.error);
      }
      if (res.ok) {
        navigate("/home");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
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
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          name="firstName"
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          label="Last Name"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          name="lastName"
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          label="Location"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          name="location"
          sx={{ gridColumn: "span 4" }}
        />
        <TextField
          label="position"
          onChange={(e) => setPosition(e.target.value)}
          value={position}
          name="position"
          sx={{ gridColumn: "span 4" }}
        />
        <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setUserImage(acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!userImage ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{userImage.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
        <TextField
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          sx={{ gridColumn: "span 4" }}
        />
        <TextField
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
          sx={{ gridColumn: "span 4" }}
        />
        <TextField
          label="Confirm Password"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          name="confirmPassword"
          sx={{ gridColumn: "span 4" }}
        />
      </Box>

      {/* BUTTONS */}
      <Box>
        <Button
          fullWidth
          type="submit"
          sx={{
            m: "2rem 0",
            p: "1rem",
            backgroundColor: palette.primary.main,
            color: palette.background.alt,
            "&:hover": { color: palette.primary.main },
          }}
        >
          REGISTER
        </Button>
        <Typography
          onClick={() => {
            navigate("/login");
          }}
          sx={{
            textDecoration: "underline",
            color: palette.primary.main,
            "&:hover": {
              cursor: "pointer",
              color: palette.primary.light,
            },
          }}
        >
          Already have an account? Login here.
        </Typography>
      </Box>
    </form>
  );
};

RegisterForm.propTypes = {
  errorMessage: PropType.string,
  setErrorMessage: PropType.func,
};

export default RegisterForm;
