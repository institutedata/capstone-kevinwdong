import PropType from "prop-types"
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SportsBasketBallIcon from "@mui/icons-material/SportsBasketball";

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        IOD
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const defaultTheme = createTheme();

const LoginForm = ({logStatus, setLogStatus}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    console.log(email, password);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:8080/api/users/login",
        { email, password },
        config
      );
      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLogStatus(!logStatus);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "inherit" }}>
              <SportsBasketBallIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="end">
              {/* <Grid item xs>
                <Link href="#" variant="body2" style={{
                    textDecoration: "none",
                    color: "inherit",
                    fontSize: "inherit",
                  }}>
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <NavLink
                  to="/register"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    fontSize: "inherit",
                  }}
                >
                  Don&apos;t have an account? Sign Up
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright
          sx={{ mt: 8, mb: 4, color: "inherit", fontSize: "inherit" }}
        />
      </Container>
    </ThemeProvider>
  );
};

LoginForm.propTypes = {
  logStatus: PropType.bool,
  setLogStatus: PropType.func
}

export default LoginForm;
