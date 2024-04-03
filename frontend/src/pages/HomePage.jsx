import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import UserWidget from "../widgets/UserWidget.jsx";
import MyPostWidget from "../widgets/MyPostWidget.jsx";
import PostsWidget from "../widgets/PostsWidget.jsx";
import AdvertWidget from "../widgets/AdvetWidget.jsx";
import GamesWidget from "../widgets/GamesWidget.jsx";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { user } = useSelector((state) => state.user);


  return (
    <Box
      width="100%"
      padding="2rem"
      display={isNonMobileScreens ? "flex" : "block"}
      gap="1rem"
      justifyContent="space-between"
    >
      {isNonMobileScreens && (
        <Box flexBasis="26%">
          <UserWidget userId={user._id} userImage={user.userImage} />
        </Box>
      )}

      <Box
        flexBasis={isNonMobileScreens ? "40%" : undefined}
        mt={isNonMobileScreens ? undefined : "1rem"}
      >
        <MyPostWidget userImage={user.userImage} />
      <PostsWidget isProfile={false} /> 
        <GamesWidget isProfile={false} />
      </Box>

      
     
        {isNonMobileScreens && <Box 
        flexBasis={isNonMobileScreens ? "40%" : undefined}
        mt={isNonMobileScreens ? undefined : "1rem"}
        >
          <AdvertWidget />
          <GamesWidget isProfile={false} />
        </Box>}
    </Box>
  );
};

export default HomePage;
