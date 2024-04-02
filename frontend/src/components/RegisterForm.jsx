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
import { themeSettings } from "../theme";
import { setRegister } from "../redux/userSlice";

const RegisterForm = () => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const { palette } = useTheme(themeSettings);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
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
        navigate("/login");
      }
    } catch (error) {
      setError(error.message);
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
          sx={{ gridColumn: "span 4",  mb: "1rem"}}
        />
      </Box>
      {error && <Alert severity="error">
          {error}
        </Alert>}
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
            Already have an account? Login
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
