import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";
import { NavLink} from "react-router-dom";
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
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";

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

const SignUpForm = () => {

  const [newUser, setNewUser] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setNewUser({
      userName: data.get("userName"),
      email: data.get("email"),
      password: data.get("password"),
    });
    console.log({ newUser });

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/create",
        newUser
      );
      console.log("Response: ", response.data);
    } catch (error) {
      console.log("Error: ", error);
    }

    setNewUser({
      userName: "",
      email: "",
      password: "",
    });

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
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
              <SportsBasketballIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
          </Box>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  name="userName"
                  autoComplete="userName"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm password"
                  label="Confirm Password"
                  type="password"
                  id="confirm password"
                  autoComplete="new-password"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              <NavLink to='/home'>Sign Up</NavLink>
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink
                  to="/signIn"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    fontSize: "inherit",
                  }}
                >
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5, color: "inherit", fontSize: "inherit" }} />
      </Container>
    </ThemeProvider>
  );
};

SignUpForm.propTypes = {
  handleSubmit: PropTypes.func,
  handleInputChange: PropTypes.func,
  setNewUser: PropTypes.func,
};

export default SignUpForm;
