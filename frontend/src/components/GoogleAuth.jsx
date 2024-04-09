import { Button, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useTheme } from "@mui/material/styles";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";

const GoogleAuth = () => {
  const { palette } = useTheme();
  const main = palette.neutral.main;

  const handleGoogle = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      console.log(resultsFromGoogle);
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Button
      onClick={handleGoogle}
      type="button"
      variant="outlined"
      sx={{
        width: "100%",
        m: "1rem 0",
        p: "0.5rem",
        backgroundColor: "#c84117",
        color: main,
      }}
    >
      <GoogleIcon size="1.5rem" />
      <Typography variant="h5" fontWeight="500" ml="1rem">
        Continue with Google
      </Typography>
    </Button>
  );
};

export default GoogleAuth;
