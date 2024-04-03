import PropTypes from "prop-types";
import { useState } from "react";
import { ChatBubbleOutlineOutlined } from "@mui/icons-material";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../components/FlexBetween";
import WidgetWrapper from "../components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setGame } from "../redux/gameSlice";
import UserAvatar from "../components/UserAvatar";

const GameWidget = ({
  gameId,
  gameUserId,
  firstName,
  lastName,
  title,
  description,
  location,
  gameImage,
  userImage,
  players,
  comments,
}) => {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showPlayers, setShowPlayers] = useState(false);
  const [isComments, setIsComments] = useState(false);

  const playerCount = Object.keys(players).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchPlayer = async () => {
    const response = await fetch(
      `http://localhost:8080/games/${gameId}/player`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: gameUserId,
          firstName: firstName,
          lastName: lastName,
          userImage: userImage,
        }),
      }
    );
    const updatedGame = await response.json();
    dispatch(setGame({ game: updatedGame }));
  };

  return (
    <WidgetWrapper mb="1rem">
      <Typography color="white" sx={{ mt: "1rem" }}>
        {title}
      </Typography>

      {gameImage && (
        <img
          width="100%"
          height="auto"
          alt="game"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={gameImage}
        />
      )}
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchPlayer}>
              <SportsBasketballIcon />
            </IconButton>
            <Typography>{playerCount}</Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <IconButton>
              <ChatBubbleOutlineOutlined
                onClick={() => {
                  setShowPlayers(!showPlayers);
                  setIsComments(!isComments);
                }}
              />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ArrowDropDownIcon
            onClick={() => {
              setIsComments(!isComments);
              setShowPlayers(!showPlayers);
            }}
          />
        </IconButton>
      </FlexBetween>
      {showPlayers && (
        <Box mt="0.5rem">
          {players.map((player) => (
            <>
              <Box m="0.5rem">
                <FlexBetween>
                  <UserAvatar userImage={userImage} size="40px" />
                  <FlexBetween gap="0.5rem">
                    <Typography>{firstName}</Typography>
                    <Typography>{lastName}</Typography>
                  </FlexBetween>
                </FlexBetween>
                <Divider />
              </Box>
            </>
          ))}
        </Box>
      )}
      {isComments && (
        <Box mt="0.5rem">
          {/* {comments.map((comment, i) => (
          <Box key={`${name}-${i}`}>
            <Divider />
            <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
              {comment}
            </Typography>
          </Box>
        ))} */}
          hello world
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

GameWidget.propTypes = {
  gameId: PropTypes.string,
  gameUserId: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  location: PropTypes.string,
  gameImage: PropTypes.string,
  userImage: PropTypes.string,
  players: PropTypes.array,
  player: PropTypes.object,
  comments: PropTypes.array,
};

export default GameWidget;
