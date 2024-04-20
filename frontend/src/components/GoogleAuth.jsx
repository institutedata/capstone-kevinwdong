import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import apiClient from "../utils/apiClient.js"
import GoogleIcon from "@mui/icons-material/Google";
import { useTheme } from "@mui/material/styles";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../utils/firebase";
import { setLogin } from "../redux/userSlice";

const GoogleAuth = () => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogle = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const response = await apiClient.post("/auth/google", {
        firstName: resultsFromGoogle.user.displayName.toLowerCase().split(" ")[0],
        lastName: resultsFromGoogle.user.displayName.toLowerCase().split(" ")[1],
        email: resultsFromGoogle.user.email,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      }); 
      const data = response.data;
      if (response.status === 200) {
        dispatch(setLogin(data));
        navigate("/home");
      } else {
        console.error(data.message);
      }
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
        backgroundColor: palette.primary.main,
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
