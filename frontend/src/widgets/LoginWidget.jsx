import PropType from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  Alert,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/userSlice";
import WidgetWrapper from "../components/WidgetWrapper";
import GoogleAuth from "../components/GoogleAuth";
import apiClient from "../utils/apiClient.js"

const LoginWidget = () => {
  const { token } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { palette } = useTheme();
  const main = palette.neutral.main;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      const response = await apiClient.post("/auth/login", formData,{
        headers: { Authorisation: token},
      });
      const data = response.data;

      if (response.status ===200) {
           dispatch(setLogin(data));
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
      <Box>
        <form onSubmit={handleSubmit}>
          <Box>
            <TextField
              fullWidth
              label="Email"
              type="email"
              id="email"
              autoComplete="email"
              onChange={handleChange}
              name="email"
              sx={{ mb: "2rem" }}
            />
            <TextField
              fullWidth
              autoComplete="current-password"
              label="Password"
              type="password"
              id="password"
              onChange={handleChange}
              name="password"
              sx={{ mb: "2rem" }}
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
                LOGIN
              </Typography>
            </Button>
            <GoogleAuth />
            <Typography
              mt="1rem"
              variant="h5"
              fontWeight="500"
              onClick={() => {
                navigate("/register");
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              Don&apos;t have an account? Sign Up here
            </Typography>
          </Box>
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
