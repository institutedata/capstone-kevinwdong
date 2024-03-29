import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

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

const Footer = () => {
  return (
    <Copyright
          sx={{ outerHeight: '60px', color: "inherit", fontSize: "inherit", backgroundColor: "inherit"}}
        />
  )
}

export default Footer