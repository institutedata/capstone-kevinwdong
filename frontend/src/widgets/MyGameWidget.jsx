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
import { setPosts } from "../redux/postSlice.js";
import { useState } from "react";
import FlexBetween from "../components/FlexBetween.jsx";
import WidgetWrapper from "../components/WidgetWrapper.jsx";

const MyGameWidget = () => {
  const [gameTitle, setGameTitle] = useState("");
  const [gameLocation, setGameLocation] = useState("");
  const [gameDescription, setGameDescription] = useState("");
  const [game, setGame] = useState(false);

  const { user, token } = useSelector((state) => state.user);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handleGame = async () => {
    try {

      const response = await fetch(`http://localhost:8080/games/create`, {
        method: "POST",
        headers: {
          Authorisation: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          title: gameTitle,
          location: gameLocation,
          description: gameDescription,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        return;
      } else {
        const posts = await response.json();
        dispatch(setPosts(posts));
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
            setGame(true);
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
              setGame(true);
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
              setGame(true);
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
          disabled={!game}
          onClick={handleGame}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
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
