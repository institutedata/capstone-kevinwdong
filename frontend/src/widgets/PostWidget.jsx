import PropTypes from "prop-types";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../components/FlexBetween";
import Friend from "../components/Friend";
import WidgetWrapper from "../components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  position,
  picturePath,
  userImage,
  likes,
  comments,
}) => {
 
  const { currentUser } = useSelector((state) => state.user)
  const loggedInUserId = currentUser.user._id;
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;  
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;


  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={position}
        userImage={userImage}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={'#'}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton >
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton >
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
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
};

export default PostWidget;