import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import UserWidget from "../widgets/UserWidget.jsx";
import PostsWidget from "../widgets/PostsWidget.jsx";
import ProfileWidget from "../widgets/ProfileWidget.jsx";
import GamesWidget from "../widgets/GamesWidget.jsx";
import MyPostWidget from "../widgets/MyPostWidget.jsx";
import MyGameWidget from "../widgets/MyGameWidget.jsx";

const ProfilePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { user } = useSelector((state) => state.user);
  const [editProfile, setEditProfile] = useState(false);
  const { postOrGame } = useSelector((state) => state.mode);

  return (
    <Box
      width="100%"
      padding="2rem 2rem"
      display={isNonMobileScreens ? "flex" : "block"}
      gap="1rem"
      justifyContent="space-between"
    >
      <Box
        flexBasis={isNonMobileScreens ? "26%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
      >
        {postOrGame === "game" ? <MyGameWidget /> : <MyPostWidget />}
        {!isNonMobileScreens && editProfile && (
          <ProfileWidget
            editProfile={editProfile}
            setEditProfile={setEditProfile}
            userId={user._id}
          />
        )}
        <UserWidget editProfile={editProfile} setEditProfile={setEditProfile} />
      </Box>
      <Box
        flexBasis={isNonMobileScreens ? "40%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
      >
        {editProfile && isNonMobileScreens && (
          <ProfileWidget
            editProfile={editProfile}
            setEditProfile={setEditProfile}
            userId={user._id}
          />
        )}
        <PostsWidget userId={user._id} isProfile={true} />
      </Box>
      <Box
        flexBasis={isNonMobileScreens ? "40%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
      >
        <GamesWidget userId={user._id} isProfile={true} />
        <Box m="2rem 0" />
      </Box>
    </Box>
  );
};

export default ProfilePage;
