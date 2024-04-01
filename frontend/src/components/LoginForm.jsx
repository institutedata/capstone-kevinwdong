import PropType from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, useTheme, Alert} from "@mui/material";
import { themeSettings } from "../theme";
import { useDispatch, useSelector } from "react-redux";
import { logInStart, logInSuccess, logInFailure } from "../redux/userSlice"; 

const LoginForm = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error: errorMessage } = useSelector((state) => state.user);
  const { palette } = useTheme(themeSettings);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      dispatch(logInFailure("Please fill in all fields"));
      return;
    }
    try {
      dispatch(logInStart());
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(logInFailure(data.message))
      }
      if (res.ok) {
        dispatch(logInSuccess(data));
        navigate("/home");
      }
    } catch (error) {
      dispatch(logInFailure(error.message));
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box>
          <TextField
            fullWidth
            label="Email"
            type="email"
            id="email"
            onChange={handleChange}
            name="email"
            sx={{ mb: "1rem" }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            id="password"
            onChange={handleChange}
            name="password"
            sx={{ mb: "1rem" }}
          />
        </Box>
        {errorMessage && <Alert severity="error">
          {errorMessage}
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
            LOGIN
          </Button>
          <Typography
            onClick={() => {
              navigate("/register");
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
            Don&apos;t have an account? Sign Up here.
          </Typography>
        </Box>
      </form>
    </Box>
  );
};

LoginForm.propTypes = {
  errorMessage: PropType.string,
  setErrorMessage: PropType.func,
};

export default LoginForm;
