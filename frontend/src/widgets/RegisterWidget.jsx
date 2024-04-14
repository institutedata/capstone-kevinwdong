import PropType from "prop-types";
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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRegister } from "../redux/userSlice";
import WidgetWrapper from "../components/WidgetWrapper";
import GoogleAuth from "../components/GoogleAuth";
import apiClient from "../utils/apiClient.js";

const RegisterWidget = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { palette } = useTheme();
  const main = palette.neutral.main;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    try {
      const response = await apiClient.post("/auth/register", formData);
      const data = response.data;
      if (response.status === 200) {
        dispatch(setRegister(data));
        navigate("/home");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <WidgetWrapper>
      <Typography
        color={main}
        variant="h4"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Welcom to Sport Connect
      </Typography>
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
            autoComplete="first-name"
            onChange={handleChange}
            id="firstName"
            name="firstName"
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            label="Last Name"
            autoComplete="last-name"
            onChange={handleChange}
            id="lastName"
            name="lastName"
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            label="Email"
            autoComplete="email"
            onChange={handleChange}
            id="email"
            name="email"
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            label="Password"
            autoComplete="new-password"
            type="password"
            onChange={handleChange}
            id="password"
            name="password"
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            label="Confirm Password"
            autoComplete="new-password"
            type="password"
            onChange={handleChange}
            id="confirmPassword"
            name="confirmPassword"
            sx={{ gridColumn: "span 4", mb: "1rem" }}
          />
        </Box>
        {error && <Alert severity="error">{error}</Alert>}
        <Box>
          <Button
            type="submit"
            sx={{
              width: "100%",
              m: "1rem 0",
              p: "0.5rem",
              backgroundColor: palette.primary.main,
              color: main,
            }}
          >
            <Typography variant="h5" fontWeight="500">
              Register
            </Typography>
          </Button>
          <GoogleAuth />
          <Typography
            mt="1rem"
            variant="h5"
            fontWeight="500"
            onClick={() => {
              navigate("/login");
            }}
            sx={{
              textDecoration: "underline",
              color: palette.primary.main,
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            Already have an account? Login here
          </Typography>
        </Box>
      </form>
    </WidgetWrapper>
  );
};

RegisterWidget.propTypes = {
  errorMessage: PropType.string,
  setErrorMessage: PropType.func,
};

export default RegisterWidget;
