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
// import { useDispatch, useSelector } from "react-redux";

const RegisterForm = () => {
  const [formData, setFormData] = useState({});
  const { palette } = useTheme(themeSettings);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const { error: errorMessage } = useSelector((state) => state.error);
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
        method: "POST",
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
          required
          label="Email"
          onChange={handleChange}
          id="email"
          name="email"
          sx={{ gridColumn: "span 4" }}
        />
        <TextField
          required
          label="Password"
          type="password"
          onChange={handleChange}
          id="password"
          name="password"
          sx={{ gridColumn: "span 4" }}
        />
        <TextField
          required
          label="Confirm Password"
          type="password"
          onChange={handleChange}
          id="confirmPassword"
          name="confirmPassword"
          sx={{ gridColumn: "span 4" }}
        />
      </Box>

      {/* BUTTONS */}
      <Box display='flex' justifyContent='space-between'>
        
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
  );
};

RegisterForm.propTypes = {
  errorMessage: PropType.string,
  setErrorMessage: PropType.func,
};

export default RegisterForm;
