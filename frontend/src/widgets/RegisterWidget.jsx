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
import FlexBetween from "../components/FlexBetween";

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
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === false) {
        setError(data.message);
      }
      if (response.ok) {
        dispatch(setRegister(data));
        navigate("/home");
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
            label="Email"
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
        <FlexBetween>
          <Typography
            variant="h4"
            fontWeight="500"
            onClick={() => {
              navigate("/login");
            }}
            sx={{
              textDecoration: "underline",
              color: "#c84117",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            Sign In Here
          </Typography>
          <Button
            type="submit"
            sx={{
              width: "25%",
              m: "2rem 0",
              p: "1rem",
              backgroundColor: "#c84117",
              color: main,
            }}
          >
            <Typography variant="h5" fontWeight="500">
              Sign Up
            </Typography>
          </Button>
        </FlexBetween>
      </form>
    </WidgetWrapper>
  );
};

RegisterWidget.propTypes = {
  errorMessage: PropType.string,
  setErrorMessage: PropType.func,
};

export default RegisterWidget;
