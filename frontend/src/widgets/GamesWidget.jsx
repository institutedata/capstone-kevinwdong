import { PropTypes } from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../redux/postSlice.js";
import GameWidget from "./GameWidget";

const GamesWidget = ({ isProfile = false }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  const getGames = async () => {
    const response = await fetch("http://localhost:8080/games", {
      method: "GET",
      headers: { Authorization: token },
    });
    const data = await response.json();
    dispatch(setPosts(data));
  };


  const getUserGames = async () => {
    const response = await fetch(
      `http://localhost:8080/posts/${userId}/post`,
      {
        method: "GET",
        headers: { Authorization: token },
      }
    );
    const data = await response.json();
    setPosts(data);
  }

  useEffect(() => {
    if (isProfile) {
      getUserGames();
    } else {
      getGames();
    }
  }, []);

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          position,
          postImage,
          userImage,
          likes,
          comments,
        }) => (
          <GameWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            position={position}
            postImage={postImage}
            userImage={userImage}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

GamesWidget.propTypes = {
  userId: PropTypes.string,
};

export default GamesWidget;
