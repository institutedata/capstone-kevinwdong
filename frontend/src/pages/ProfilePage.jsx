import { Box, useMediaQuery } from "@mui/material";
import UserWidget from "../widgets/UserWidget.jsx";
import PostsWidget from "../widgets/PostsWidget.jsx";
import FriendListWidget from "../widgets/FriendListWidget.jsx";
import ProfileForm from "../components/ProfileForm.jsx";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        {/* <Box
          flexBasis={isNonMobileScreens ? "26%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <UserWidget />
        </Box> */}
        <Box
          flexBasis={isNonMobileScreens ? "100%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <ProfileForm />
          
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <PostsWidget />
            <Box m="2rem 0" />
            <FriendListWidget />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
