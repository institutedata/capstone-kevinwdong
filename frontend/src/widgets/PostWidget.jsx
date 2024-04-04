/* eslint-disable react/prop-types */
import { useState } from "react";
import PropTypes from "prop-types";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
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
import { setPost } from "../redux/postSlice.js";
import UserAvatar from "../components/UserAvatar";

const PostWidget = ({
  postId,
  description,
  postImage,
  userImage,
  likes,
  comments,
}) => {
  const [commentText, setCommentText] = useState("");
  const [isComments, setIsComments] = useState(false);
  const { user, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const loggedInUserId = user._id;
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;


  

  const patchLike = async () => {
    const response = await fetch(`http://localhost:8080/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const addComment = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/posts/update/${postId}/comments`,
        {
          method: "PUT",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user._id,
            userImage: user.userImage,
            comment: commentText,
            firstName: user.firstName,
            lastName: user.lastName,
            postId: postId,
          }),
        }
      );
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <WidgetWrapper mb="1rem">
      <Box display="flex" justifyContent="start">
        <FlexBetween gap="1rem">
          <UserAvatar image={userImage} size="40px" />
          <Box>
            <Typography
              color={main}
              variant="h5"
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {user.firstName} {user.lastName}
            </Typography>
          </Box>
        </FlexBetween>
      </Box>
      <Typography
        color={main}
        variant="h5"
        fontWeight="500"
        sx={{ mt: "1rem" }}
      >
        {description}
      </Typography>
      {postImage && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={postImage}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: "#c84117" }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography color={main} variant="h6" fontWeight="500">
              {likeCount}
            </Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography color={main} variant="h6" fontWeight="500">
              {comments.length}
            </Typography>
          </FlexBetween>
        </FlexBetween>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment) => (
            <>
              <Box key={comment._id}>
                <Box display="flex" justifyContent="start" m="1rem 0">
                  <Typography variant="h5" color={dark} fontWeight="500">
                    {comment.comment}
                  </Typography>
                </Box>
                <Box m="1rem">
                  <FlexBetween>
                    <FlexBetween gap="0.5rem">
                      <Typography color={medium} variant="h6" fontWeight="500">
                        {comment.firstName}
                      </Typography>
                      <Typography color={medium} variant="h6" fontWeight="500">
                        {comment.lastName}
                      </Typography>
                    </FlexBetween>
                  </FlexBetween>
                  <Divider />
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
              onClick={addComment}
              sx={{
                color: main,
                backgroundColor: "#c84117",
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
PostWidget.prototype = {
  postId: PropTypes.string.isRequired,
  postUserId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string,
  picturePath: PropTypes.string,
  userPicturePath: PropTypes.string.isRequired,
  likes: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  length: PropTypes.number,
};

export default PostWidget;
