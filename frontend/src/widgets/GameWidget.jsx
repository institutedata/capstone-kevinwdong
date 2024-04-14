import PropTypes from "prop-types";
import { useState } from "react";
import { ChatBubbleOutlineOutlined } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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
import { LocationModal } from "../components/LocationModal";
import UserAvatar from "../components/UserAvatar";
import { setGames } from "../redux/gameSlice";
import { setGame } from "../redux/gameSlice";
import apiClient from "../utils/apiClient.js";

const GameWidget = ({
  gameId,
  gameUserImage,
  gameUserName,
  title,
  locationName,
  description,
  gameImage,
  comments,
  isProfile,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { user, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const addGameComments = async () => {
    try {
      const response = await apiClient.patch(
        `/games/update/${gameId}/comments`,
        {
          uerId: user.gameUserId,
          userImage: user.userImage,
          firstName: user.firstName,
          lastName: user.lastName,
          comment: commentText,
          gameId: gameId,
        },
        {
          headers: {
            Authorisation: token,
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      if (response.status === 200) {
        dispatch(setGame({ game: data }));
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await apiClient.delete(`/games/delete/${gameId}`, {
        headers: {
          Authorisation: token,
        },
      });
      const data = response.data;
      if (response.status === 200) {
        dispatch(setGames({ games: data }));
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <WidgetWrapper mb="1rem">
      <Box>
        <FlexBetween justifyContent="space-between" mb="1rem">
          <Typography
            color={main}
            variant="h4"
            fontWeight="500"
            sx={{ mt: "1rem" }}
          >
            {title}
          </Typography>
          {isProfile && (
            <Box>
              <IconButton onClick={handleDelete}>
                <MoreVertIcon />
              </IconButton>
            </Box>
          )}
        </FlexBetween>

        {gameImage && (
          <img
            width="100%"
            height="auto"
            alt="game"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:8080/images/${gameImage}`}
          />
        )}
        <Typography
          color={main}
          variant="h5"
          fontWeight="500"
          sx={{ mt: "1rem" }}
        >
          {locationName}
        </Typography>
        <Typography
          color={main}
          variant="h5"
          fontWeight="500"
          sx={{ mt: "1rem" }}
        >
          {description}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="end" mt="1rem">
        <FlexBetween gap="1rem">
          <UserAvatar userImage={gameUserImage} size="40px" />
          <Box>
            <Typography color={main} variant="h5" fontWeight="500">
              {gameUserName}
            </Typography>
          </Box>
        </FlexBetween>
      </Box>
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <LocationModal gameId={gameId} />
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <IconButton
              onClick={() => {
                setIsComments(!isComments);
              }}
            >
              <ChatBubbleOutlineOutlined fontSize="large" />
            </IconButton>
            <Typography color={main} variant="h6" fontWeight="500">
              {comments.length}
            </Typography>
          </FlexBetween>
        </FlexBetween>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments?.map((comment) => (
            <>
              <Box key={comment._id}>
                <Box display="flex" justifyContent="start" m="1rem 0">
                  <Typography variant="h5" color={main} fontWeight="500">
                    {comment.comment}
                  </Typography>
                </Box>
                <Box m="1rem">
                  <Box display="flex" justifyContent="end">
                    <FlexBetween gap="0.5rem">
                      <UserAvatar userImage={comment.userImage} size="40px" />
                      <FlexBetween gap="0.5rem">
                        <Typography
                          color={medium}
                          variant="h6"
                          fontWeight="500"
                        >
                          {comment.firstName}
                        </Typography>
                        <Typography
                          color={medium}
                          variant="h6"
                          fontWeight="500"
                        >
                          {comment.lastName}
                        </Typography>
                      </FlexBetween>
                    </FlexBetween>
                  </Box>
                  <Divider sx={{ mt: "0.5rem" }} />
                </Box>
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
                color: main,
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
  gameUserName: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  locationName: PropTypes.string,
  gameImage: PropTypes.string,
  gameUserImage: PropTypes.string,
  comments: PropTypes.array,
  isProfile: PropTypes.bool,
};

export default GameWidget;
