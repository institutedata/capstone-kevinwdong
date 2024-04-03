import PropTypes from "prop-types";
import { ChatBubbleOutlineOutlined } from "@mui/icons-material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../components/FlexBetween";
import WidgetWrapper from "../components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setGame } from "../redux/gameSlice";

const GameWidget = ({
  gameId,
  gameUserId,
  name,
  title,
  description,
  location,
  gameImage,
  userImage,
  players,
  comments,
}) => {
  const { user, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const loggedInUserId = user._id;
  const isPlay = Boolean(players[loggedInUserId]);
  const playerCount = Object.keys(players).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchPlayer = async () => {
    const response = await fetch(`http://localhost:8080/games/${gameId}/play`, {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedGame = await response.json();
    dispatch(setGame({ game: updatedGame }));
  };

  return (
    <WidgetWrapper mb="1rem">
      <Typography color={main} sx={{ mt: "1rem" }}>
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
              {isPlay ? (
                <ThumbUpAltIcon sx={{ color: primary }} />
              ) : (
                <ThumbUpOffAltOutlinedIcon />
              )}
            </IconButton>
            <Typography>{playerCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
      </FlexBetween>
      {/* {isComments && (
      <Box mt="0.5rem">
        {comments.map((comment, i) => (
          <Box key={`${name}-${i}`}>
            <Divider />
            <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
              {comment}
            </Typography>
          </Box>
        ))}
        <Divider />
      </Box>
    )} */}
    </WidgetWrapper>
  );
};

GameWidget.propTypes = {
  gameId: PropTypes.string,
  gameUserId: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  location: PropTypes.string,
  gameImage: PropTypes.string,
  userImage: PropTypes.string,
  participants: PropTypes.array,
  comments: PropTypes.array,
};

export default GameWidget;
