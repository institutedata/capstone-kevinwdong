import { useEffect, useState } from "react";
import { useSelector } from "react-redux";  
import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../components/Friend.jsx";
import WidgetWrapper from "../components/WidgetWrapper.jsx";



const FriendListWidget = ({ userId }) => {
  // const [friends, setFriends] = useState();
  // const { palette } = useTheme();
  // const { currentUser } = useSelector((state) => state.user)
  // const token = currentUser.token;
  // console.log("UserId:" , userId)


  // const getFriends = async () => {
  //   const response = await fetch(
  //     `http://localhost:8080/users/${userId}/friends`,
  //     {
  //       method: "GET",
  //       headers: { Authorization: token },
  //     }
  //   );
  //   const data = await response.json();
  //     setFriends(data);
      
  // };
  
  //  console.log("Friends:", friends) 

  // useEffect(() => {
  //   getFriends();
  // }, []);

  return (
    <div>Firends List</div>
    // <WidgetWrapper>
    //   <Typography
    //     color={palette.neutral.dark}
    //     variant="h5"
    //     fontWeight="500"
    //     sx={{ mb: "1.5rem" }}
    //   >
    //     Friend List
    //   </Typography>
    //   <Box display="flex" flexDirection="column" gap="1.5rem">
    //     {friends.map((friend) => (
    //       <Friend
    //         key={friend._id}
    //         friendId={friend._id}
    //         name={`${friend.firstName} ${friend.lastName}`}
    //         subtitle={friend.position}
    //         userImage={friend.userImage}
    //       />
    //     ))}
    //   </Box>
    // </WidgetWrapper>
  );
};

export default FriendListWidget;