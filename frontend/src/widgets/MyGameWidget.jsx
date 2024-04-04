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

const MyGameWidget = () => {
  const [gameTitle, setGameTitle] = useState("");
  const [gameLocation, setGameLocation] = useState("");
  const [gameDescription, setGameDescription] = useState("");
  const [gameText, setGameText] = useState(false);
  const { user, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();


  const { palette } = useTheme();
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;




  const handleGame = async () => {
    try {
      const gameImageUrl = await fetch('https://source.unsplash.com/featured/?basketball')
      .then(response => response.url)

      const response = await fetch(`http://localhost:8080/games/create`, {
        method: "POST",
        headers: {
          Authorisation: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          userImage: user.userImage,
          firstName: user.firstName,
          lastName: user.lastName,
          title: gameTitle,
          location: gameLocation,
          description: gameDescription,
          gameImage: gameImageUrl,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        return;
      } else {
        const games = await response.json();
        dispatch(setGames(games));
      }
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
          <InputBase
            placeholder="Game Location..."
            onChange={(e) => {
              setGameLocation(e.target.value);
              setGameText(true);
            }}
            value={gameLocation}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "0.5rem 1rem",
            }}
          />
        </Box>
        <Box>
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
      </Box>

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => console.log("upload image")}>
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
            backgroundColor: '#c84117',
            borderRadius: "3rem",
          }}
        >
          GAME
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyGameWidget;
