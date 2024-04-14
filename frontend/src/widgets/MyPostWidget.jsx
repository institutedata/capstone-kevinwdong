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
import ImageUpload from "../components/ImageUpload.jsx";
import apiClient from "../utils/apiClient.js";

const MyPostWidget = () => {
  const [postText, setPostText] = useState("");
  const [file, setFile] = useState();
  const [upload, setUpload] = useState(false);
  const { user, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  
  const { palette } = useTheme();
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", user._id);
      formData.append("userImage", user.userImage);
      formData.append("description", postText);
      formData.append("firstName", user.firstName);
      formData.append("lastName", user.lastName);
      if (file) {
        formData.append("file", file);
      }
      

      const response = await apiClient.post(`/posts/create`, formData, {
        headers: {
          Authorisation: token,
        },
      });
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
      setPostText("");
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
        <FlexBetween gap="0.25rem" onClick={() => setUpload(!upload)}>
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
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
      <ImageUpload upload={upload} setFile={setFile}/>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
