import PropType from "prop-types";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FlexBetween from "./FlexBetween";
// import { setDelete } from "../redux/userSlice";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

const DeleteUser = () => {
  const [open, setOpen] = useState(false);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const handleDelete = async () => {
  //   try {
  //     const gameResponse = await fetch(
  //       `http://localhost:8080/games/delete/${userId}/games`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           Authorisation: token,
  //         },
  //       }
  //     );
  //     const gameData = await gameResponse.json();

    //   const postResponse = await fetch(
    //     `http://localhost:8080/posts/delete/${userId}/posts`,
    //     {
    //       method: "DELETE",
    //       headers: {
    //         Authorisation: token,
    //       },
    //     }
    //   );
    //   const postData = await postResponse.json();

    //   const userResponse = await fetch(
    //     `http://localhost:8080/users/delete/${user._id}`,
    //     {
    //       method: "DELETE",
    //       headers: {
    //         Authorisation: token,
    //       },
    //     }
    //   );
    //   const userData = await userResponse.json();

      // if (!gameData.success) {
      //   throw new Error("Failed to delete user games");
      // } else {
      //   dispatch(setDelete());
      //   navigate("/");
      //   }




    //   if (!gameData.success || !postData.success || !userData.success) {
    //     throw new Error("Failed to delete user account");
    //   } else {
    //     dispatch(setDelete());
    //     navigate("/");
    //   }
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  return (
    <div>
      <Button onClick={() => setOpen(true)} variant="outlined" color="error">
        DELETE
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete User Account
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            By clicking the delete button, you will delete your account and all
            the data associated with it. Are you sure you want to delete your
            account?
          </Typography>
        </Box>
        <Box display="flex" justifyContent="end">
          <FlexBetween>
            <Button onClick={() => console.log( 'user account deleted')} variant="outlined" color="error">
              DELETE
            </Button>
            <Button onClick={() => setOpen(false)} variant="outlined">
              CANCEL
            </Button>
          </FlexBetween>
        </Box>
      </Modal>
    </div>
  );
};

DeleteUser.propTypes = {
  userId: PropType.string,
  token: PropType.string,
};

export default DeleteUser;