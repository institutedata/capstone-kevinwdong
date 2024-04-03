import PropTypes from "prop-types";
import { useState } from "react";
import { ChatBubbleOutlineOutlined } from "@mui/icons-material";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PostAddIcon from "@mui/icons-material/PostAdd";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  InputBase,
} from "@mui/material";
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
  const [showPlayers, setShowPlayers] = useState(false);
  const [isComments, setIsComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const playerCount = Object.keys(players).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;

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

  const addGameComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/games/update/${gameId}/comments`,
        {
          method: "PUT",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: gameUserId,
            comment: commentText,
            firstName: firstName,
            lastName: lastName,
            gameId: gameId,
          }),
        }
      );
      const updatedGame = await response.json();
      dispatch(setGame({ game: updatedGame }));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <WidgetWrapper mb="1rem">
      <Box>
        <Typography
          color={main}
          variant="h4"
          fontWeight="500"
          sx={{ mt: "1rem" }}
        >
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
        <Typography
          color={main}
          variant="h6"
          fontWeight="500"
          sx={{ mt: "1rem" }}
        >
          {location}
        </Typography>
        <Typography
          color={main}
          variant="h6"
          fontWeight="500"
          sx={{ mt: "1rem" }}
        >
          {description}
        </Typography>
      </Box>
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchPlayer}>
              <SportsBasketballIcon />
            </IconButton>
            <Typography color={main} variant="h6" fontWeight="500">
              {playerCount}
            </Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <IconButton
              onClick={() => {
                setIsComments(!isComments);
              }}
            >
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography color={main} variant="h6" fontWeight="500">
              {comments.length}
            </Typography>
          </FlexBetween>
        </FlexBetween>
        <IconButton
          onClick={() => {
            setShowPlayers(!showPlayers);
          }}
        >
          <ArrowDropDownIcon />
        </IconButton>
      </FlexBetween>
      {showPlayers && (
        <Box mt="0.5rem">
          {players.map((player) => (
            <>
              <Box m="1rem" key={player._id}>
                <FlexBetween>
                  <UserAvatar userImage={userImage} size="40px" />
                  <FlexBetween gap="0.5rem">
                    <Typography color={main} variant="h6" fontWeight="500">
                      {firstName}
                    </Typography>
                    <Typography color={main} variant="h6" fontWeight="500">
                      {lastName}
                    </Typography>
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
          {comments.map((comment) => (
            <>
              <Box key={comment._id}>
                <Box display="flex" justifyContent="start" m="1rem 0">
                  <Typography variant="h5" color={main} fontWeight="500">
                    {comment.comment}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="end" mb="0.5rem">
                  <Typography color={main} variant="h6" fontWeight="500">
                    {comment.firstName} {comment.lastName}
                  </Typography>
                </Box>
                <Divider />
              </Box>
            </>
          ))}
          <Box mt="2rem">
            <InputBase
              placeholder="What do you think?"
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
              sx={{
                width: "100%",
                backgroundColor: palette.neutral.light,
                borderRadius: "1rem",
                padding: "0.5rem 1rem",
              }}
            />
          </Box>
          <Box display="flex" justifyContent="end" mt="0.5rem">
            <IconButton
              disabled={!commentText}
              onClick={addGameComments}
              sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "3rem",
              }}
            >
              <PostAddIcon />
            </IconButton>
          </Box>
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
