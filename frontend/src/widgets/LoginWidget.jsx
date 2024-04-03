import PropType from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  Alert,
} from "@mui/material";
import { themeSettings } from "../theme";
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/userSlice";
import WidgetWrapper from "../components/WidgetWrapper";
import FlexBetween from "../components/FlexBetween";

const LoginWidget = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { palette } = useTheme(themeSettings);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success === false) {
        setError(data.message);
      }
      if (response.ok) {
        dispatch(setLogin(data));
        navigate("/home");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <WidgetWrapper>
      <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
        Welcom to Hoops Connect!
      </Typography>
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
              sx={{ mb: "2rem" }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              id="password"
              onChange={handleChange}
              name="password"
              sx={{ mb: "2rem" }}
            />
          </Box>
          {error && <Alert severity="error">{error}</Alert>}
          <FlexBetween>
            
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
            <Button
              
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
              LOGIN
            </Button>
          </FlexBetween>
        </form>
      </Box>
    </WidgetWrapper>
  );
};

LoginWidget.propTypes = {
  errorMessage: PropType.string,
  setErrorMessage: PropType.func,
};

export default LoginWidget;
