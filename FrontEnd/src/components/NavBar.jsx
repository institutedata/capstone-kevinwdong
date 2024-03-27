import { useState } from "react";
import { NavLink } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Grid from '@mui/material/Grid';
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid
      container
      spacing={{ xs: 1, sm: 2 }}
      justifyContent="space-between"
      alignItems="center"
      padding="10px"
      bgcolor="primary.main"
      color="orange"
      fontSize="20px"
    >
      <Grid item onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb" color="inherit" fontSize="inherit">
          <Link
            underline="none"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            fontSize="inherit"
            to="/home"
          >
            <SportsBasketballIcon sx={{ mr: 1 }} fontSize="inherit" />
            <NavLink
              to="/home"
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  textDecoration: "none",
                  color: "inherit",
                };
              }}
            >
              Home
            </NavLink>
          </Link>
          <Link
            underline="none"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            fontSize="inherit"
          >
            <SportsBasketballIcon sx={{ mr: 1 }} fontSize="20px" />
            <NavLink
              to="/game"
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  textDecoration: "none",
                  color: "inherit",
                  fontSize: "inherit",
                };
              }}
            >
              Game
            </NavLink>
          </Link>
          <Link
            underline="none"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            fontSize="inherit"
          >
            <SportsBasketballIcon sx={{ mr: 1 }} fontSize="inherit" />
            <NavLink
              to="/blog"
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  textDecoration: "none",
                  color: "inherit",
                  fontSize: "inherit",
                };
              }}
            >
              Blog
            </NavLink>
          </Link>
        </Breadcrumbs>
      </Grid>
      
      <Grid item justifyContent='end'>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <SportsBasketballIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>
            <NavLink
              to="/user"
              style={{
                textDecoration: "none",
                color: "inherit",
                fontSize: "inherit",
              }}
            >
              My Profile
            </NavLink>
          </MenuItem>
          <MenuItem color="inherit">
            <NavLink
              to="/signUp"
              style={{
                textDecoration: "none",
                color: "inherit",
                fontSize: "inherit",
              }}
            >
              Sign Up
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink
              to="/signIn"
              style={{
                textDecoration: "none",
                color: "inherit",
                fontSize: "inherit",
              }}
            >
              Login
            </NavLink>
          </MenuItem>
        </Menu>
      </Grid>
      {/* <Grid item lg={2} md={6} sm={12}>
      <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
      </Grid> */}
    </Grid>
  );
};

export default NavBar;
