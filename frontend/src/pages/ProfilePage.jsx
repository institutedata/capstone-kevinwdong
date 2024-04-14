import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import UserWidget from "../widgets/UserWidget.jsx";
import PostsWidget from "../widgets/PostsWidget.jsx";
import ProfileWidget from "../widgets/ProfileWidget.jsx";
import GamesWidget from "../widgets/GamesWidget.jsx";

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
      {isNonMobileScreens ? (
        <>
          <Box flexBasis="26%">
            <UserWidget
              editProfile={editProfile}
              setEditProfile={setEditProfile}
              isProfile={true}
            />
            {editProfile && (
              <ProfileWidget
                editProfile={editProfile}
                setEditProfile={setEditProfile}
                userId={user._id}
                userImage={user.userImage}
              />
            )}
          </Box>
          <Box flexBasis="40%">
            <PostsWidget userId={user._id} isProfile={true} />
          </Box>
          <Box flexBasis="40%">
            <GamesWidget userId={user._id} isProfile={true} />
          </Box>
        </>
      ) : (
        <>
          <Box>
            <UserWidget
              editProfile={editProfile}
              setEditProfile={setEditProfile}
              isProfile={true}
            />
            {editProfile && (
              <ProfileWidget
                editProfile={editProfile}
                setEditProfile={setEditProfile}
                userId={user._id}
                userImage={user.userImage}
              />
            )}
          </Box>
          {postOrGame === "post" ? (
            <Box>
              <PostsWidget userId={user._id} isProfile={true} />
            </Box>
          ) : (
            <Box>
              <GamesWidget userId={user._id} isProfile={true} />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default ProfilePage;
