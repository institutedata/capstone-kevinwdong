import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";


const defaultTheme = createTheme();

const ProfileForm = () => {
  const [user, setUser] = useState();
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const updatedUser = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      userName: data.get("userName"),
      email: data.get("email"),
      password: data.get("password"),
      bio: data.get("bio"),
    };

    try {
      const response = await axios.put(
        "http://localhost:8080/api/user/update",
        updatedUser
      );
      console.log("Profile Updated: ", response.data);
    } catch (error) {
      setError(error.message);
      console.log("Error: ", error);
    }
  }

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
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography component="h1" variant="h5">
              Profile:
            </Typography>

            <Avatar sx={{ m: 1, bgcolor: "inherit" }}>
              <SportsBasketballIcon />
            </Avatar>
          </Box>

          <Box
            component="form"
            noValidate
            // onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
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
                  fullWidth
                  multiline
                  name="bio"
                  label="Bio..."
                  type="bio"
                  id="confirm password"
                  autoComplete="new-password"
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>

            <Grid container justifyContent="flex-end">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleUpdate}
                >
                  update
                </Button>
                <Button
                  type="submit"
                  color="error"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, ml: 3 }}
                  // onClick={handleDelete}
                >
                  delete
                </Button>
              </Box>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

ProfileForm.propTypes = {
  handleSubmit: PropTypes.func,
  handleInputChange: PropTypes.func,
  setNewUser: PropTypes.func,
};

export default ProfileForm;
