import { useDispatch, useSelector } from "react-redux";
import { ImageOutlined } from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
} from "@mui/material";
import { setGames } from "../redux/gameSlice.js";
import { useState } from "react";
import FlexBetween from "../components/FlexBetween.jsx";
import WidgetWrapper from "../components/WidgetWrapper.jsx";
import LocationSearch from "../components/LocationSearch.jsx";
import ImageUpload from "../components/ImageUpload.jsx";

const MyGameWidget = () => {
  const [gameTitle, setGameTitle] = useState("");
  const [location, setLocation] = useState({ name: "", lat: "", lng: ""});
  const [gameDescription, setGameDescription] = useState("");
  const [file, setFile] = useState();
  const [upload, setUpload] = useState(false);
  const [gameText, setGameText] = useState(false);
  const { user, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { palette } = useTheme();
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;


  const handleGame = async () => {
    try {

      const formData = new FormData();
      formData.append("userId", user._id);
      formData.append("userImage", user.userImage);
      formData.append("firstName", user.firstName);
      formData.append("lastName", user.lastName);
      formData.append("title", gameTitle);
      formData.append("locationName", location.name);
      formData.append("locationLat", location.lat);
      formData.append("locationLng", location.lng);
      formData.append("description", gameDescription);
      if (file) {
        formData.append("file", file);
      }
      

      const response = await fetch(`http://localhost:8080/games/create`, {
        method: "POST",
        headers: {
          Authorisation: token,
        },
        body: formData,
      });

      if (!response.ok) {
        console.log(response);
        return;
      }

     
      const data = await response?.json();
    
      dispatch(setGames({ games: data }));
      setGameTitle("");
      setLocation({ name: "", lat: "", lng: ""});
      setGameDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <WidgetWrapper mb="1rem">
      <Box display="flex" flexDirection="column" gap="1rem">
        <InputBase
          placeholder="Game Title..."
          onChange={(e) => {
            setGameTitle(e.target.value);
            setGameText(true);
          }}
          value={gameTitle}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "0.5rem 1rem",
          }}
        />
        <Box>
        <LocationSearch setLocation={setLocation}/>
        </Box>
      
          <InputBase
            placeholder="Game Description..."
            onChange={(e) => {
              setGameDescription(e.target.value);
              setGameText(true);
            }}
            value={gameDescription}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "0.5rem 1rem",
            }}
          />
      </Box>

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setUpload(!upload)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            fontWeight={500}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Upload
          </Typography>
        </FlexBetween>
        <Button
          disabled={!gameText}
          onClick={handleGame}
          sx={{
            color: main,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          GAME
        </Button>
      </FlexBetween>
      <ImageUpload upload={upload} setFile={setFile}/>
    </WidgetWrapper>
  );
};

export default MyGameWidget;
