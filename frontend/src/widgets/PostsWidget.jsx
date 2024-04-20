import { PropTypes } from "prop-types";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../redux/postSlice";
import PostWidget from "./PostWidget";
import apiClient from "../utils/apiClient.js"

const PostsWidget = ({ userId, isProfile }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.post);

  const getPosts = async () => {
    const response = await apiClient.get("/posts", {
      headers: { Authorisation: token },
    });
    const data = response.data;
    dispatch(setPosts({ posts: data }));
  };


  const getUserPosts = async () => {
    const response = await apiClient.get(
      `/posts/${userId}/posts`,
      {
        headers: { Authorisation: token },
      }
    );
    const data = response.data;
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
      {posts?.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
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
            postImage={postImage}
            userImage={userImage}
            likes={likes}
            comments={comments}
            isProfile={isProfile}
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
