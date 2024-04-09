import { Button, Typography } from "@mui/material";
import { useDispatch, useNavigate } from "react-redux";
import GoogleIcon from "@mui/icons-material/Google";
import { useTheme } from "@mui/material/styles";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { setLogin, setError } from "../redux/userSlice";

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
      console.log(resultsFromGoogle);
      const response = await fetch("http://localhost:8080/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: resultsFromGoogle.user.email,
          userImage: resultsFromGoogle.user.photoURL,
        }),
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
