import { PropTypes } from "prop-types";
import { useEffect, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPosts} from "../redux/postSlice";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile  }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.post);

  const getPosts = async () => {
    const response = await fetch("http://localhost:8080/posts", {
      method: "GET",
      headers: { Authorization: token },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:8080/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: token },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
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
  isProfile: PropTypes.bool,
};

export default PostsWidget;
