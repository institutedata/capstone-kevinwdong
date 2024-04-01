import PropType from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { themeSettings } from "../theme";

const LoginForm = ({setErrorMessage}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { palette } = useTheme(themeSettings);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, password}),
      });
      console.log(email, password);
      const data = await res.json();

      if (data.error) {
        setErrorMessage(data.error);
      }
      if (res.ok) {
        navigate("/home");
      }
    } catch (error) {
      if (error.response) {
        console.log(error);
      }
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          sx={{ mb: "1rem"}}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          sx={{ mb: "1rem"}}
        />
      </Box>
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
            navigate("/home")
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
