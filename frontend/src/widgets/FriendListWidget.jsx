// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";  
// import { Alert, Box, Typography, useTheme } from "@mui/material";
// import { setFriends } from "../redux/userSlice";
// import Friend from "../components/Friend.jsx";
// import WidgetWrapper from "../components/WidgetWrapper.jsx";



// const FriendListWidget = ({ userId }) => {
//   const [error, setError] = useState(null);
//   const dispatch = useDispatch();
//   const { palette } = useTheme();
//   const { user, token } = useSelector((state) => state.user);
//   const friends = user.friends;

//   console.log("UserId:" , userId)
//   console.log("User:", user)
//   console.log("Friends:", friends) 

//   const getFriends = async () => {
//     const response = await fetch(
//       `http://localhost:8080/users/${userId}/friends`,
//       {
//         method: "GET",
//         headers: { Authorization: token },
//       }
//     );
//     const data = await response.json();

//     if (!response.ok) {
//       setError(data.message);
//       return;
//     } else {
//       dispatch(setFriends({friedns: data}));
//     } 
//   };
  
   

//   useEffect(() => {
//     getFriends();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <WidgetWrapper>
//       {error && <Alert severity="error">{error}</Alert>}
//       <Typography
//         color={palette.neutral.dark}
//         variant="h5"
//         fontWeight="500"
//         sx={{ mb: "1.5rem" }}
//       >
//         Friend List
//       </Typography>
//       <Box display="flex" flexDirection="column" gap="1.5rem">
//         {friends.map((friend) => (
//           <Friend
//             key={friend._id}
//             friendId={friend._id}
//             name={`${friend.firstName} ${friend.lastName}`}
//             subtitle={friend.position}
//             userImage={friend.userImage}
//           />
//         ))}
//       </Box>
//     </WidgetWrapper>
//   );
// };

// export default FriendListWidget;