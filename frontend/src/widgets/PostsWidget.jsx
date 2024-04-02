import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostWidget from "./PostWidget";

const PostsWidget = ({ isProfile = false }) => {
  const [posts, setPosts] = useState([]);

  const { currentUser } = useSelector((state) => state.user);

  const getPosts = async () => {
    const response = await fetch("http://localhost:8080/posts", {
      method: "GET",
      headers: { Authorization: currentUser.token },
    });
    const data = await response.json();
    setPosts(data);
  };


  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:8080/posts/${userId}/post`,
      {
        method: "GET",
        headers: { Authorization: currentUser.token },
      }
    );
    const data = await response.json();
    setPosts(data);
  }

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
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
          <PostWidget
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

PostsWidget.propTypes = {
  userId: PropTypes.string,
};

export default PostsWidget;
