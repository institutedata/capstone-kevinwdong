import { useDispatch, useSelector } from "react-redux";
import { ImageOutlined } from "@mui/icons-material";
import {
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
} from "@mui/material";
import {
  createPostStart,
  createPostSuccess,
  createPostFailure,
} from "../redux/postSlice.js";
import { useState } from "react";
import FlexBetween from "../components/FlexBetween.jsx";
import WidgetWrapper from "../components/WidgetWrapper.jsx";
import UserImage from "../components/UserImage.jsx";
import userAvatar from "../assets/userAvatar.jpg";

const MyPostWidget = () => {
  const [post, setPost] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    try {
      createPostStart();
      const formData = new FormData();
      formData.append("userId", currentUser.user._id);
      formData.append("description", post);
      dispatch(createPostStart());
   
      const response = await fetch(`http://localhost:8080/posts/create`, {
        method: "POST",
        headers: {
          Authorisation: currentUser.token,
        },
        body: formData,
      });
      if (!response.ok) {
        dispatch(createPostFailure("Failed to create post"));
        return;
      } else {
        const posts = await response.json();
        dispatch(createPostSuccess(posts));
      }
    } catch (error) {
      createPostFailure(error.message);
    }
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={userAvatar} size="60px" />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => console.log("upload image")}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Upload
          </Typography>
        </FlexBetween>
        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
