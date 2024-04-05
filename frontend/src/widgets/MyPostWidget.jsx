import { useDispatch, useSelector } from "react-redux";
import { ImageOutlined } from "@mui/icons-material";
import {
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

const MyPostWidget = () => {
  const [postText, setPostText] = useState("");
  const { user, token } = useSelector((state) => state.user);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const handlePost = async () => {
    try {
      const postImageUrl = await fetch('https://source.unsplash.com/featured/?social')
      .then(response => response.url)

      const response = await fetch(`http://localhost:8080/posts/create`, {
        method: "POST",
        headers: {
          Authorisation: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          userImage: user.userImage,
          description: postText,
          firstName: user.firstName,
          lastName: user.lastName,
          postImage: postImageUrl,
          location: user.location,
        }),
      });
      const data = await response.json();
        dispatch(setPosts({ posts: data}));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <WidgetWrapper mb="1rem">
      <FlexBetween gap="1.5rem">
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPostText(e.target.value)}
          value={postText}
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
            fontWeight={500}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Upload
          </Typography>
        </FlexBetween>
        <Button
          disabled={!postText}
          onClick={handlePost}
          sx={{
            color: main,
            backgroundColor: '#c84117',
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
