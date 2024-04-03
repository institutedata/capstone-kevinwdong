import { useState, useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import UserWidget from "../widgets/UserWidget.jsx";
import PostsWidget from "../widgets/PostsWidget.jsx";
// import FriendListWidget from "../widgets/FriendListWidget.jsx";
import ProfileWidget from "../widgets/ProfileWidget.jsx";
import GamesWidget from "../widgets/GamesWidget.jsx";

const ProfilePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { user } = useSelector((state) => state.user);

  // const getUser = async () => {
  //   const response = await fetch(`http://localhost:8080/users/${user._id}`, {
  //     method: "GET",
  //     headers: { Authorization: token },
  //   });
  //   const data = await response.json();
  //   setUser(data);
  // };
  // useEffect(() => {
  //   getUser();
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // if (!user) return null;

  return (
    <Box
      width="100%"
      padding="2rem 2rem"
      display={isNonMobileScreens ? "flex" : "block"}
      gap="0.5rem"
      justifyContent="space-between"
    >
      <Box
        flexBasis={isNonMobileScreens ? "26%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
      >
        {!isNonMobileScreens && <ProfileWidget />}
            <UserWidget />
        <GamesWidget userId={user._id} isProfile={true} />
      </Box>
      <Box
        flexBasis={isNonMobileScreens ? "40%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
      >
          { isNonMobileScreens &&  <ProfileWidget userId={user._id}/>}
      </Box>
      <Box
        flexBasis={isNonMobileScreens ? "40%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
      >
        <PostsWidget userId={user._id} isProfile={true} />
        <Box m="2rem 0" />
      </Box>
    </Box>
  );
};

export default ProfilePage;
