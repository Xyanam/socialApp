import React from "react";
import classes from "./PostsUser.module.css";
import {
  getDatabase,
  ref,
  onValue,
  runTransaction,
  update,
} from "firebase/database";
import { useListKeys } from "react-firebase-hooks/database";
import Loader from "../../../components/Loader/Loader";
const PostsUser = ({ id, username }) => {
  const db = getDatabase();
  const [keys, loading] = useListKeys(ref(db, `users/${id}/posts`));

  let posts = [];
  const userPostsRef = ref(db, `users/${id}/posts`);
  onValue(userPostsRef, (snapshot) => {
    const data = snapshot.val();
    keys.map((key) => {
      posts.unshift(data[key]);
    });
  });

  function toggleStar(uid, postId) {
    const db = getDatabase();
    const postRef = ref(db, `users/${uid}/posts/${postId}`);

    const updates = {};
    runTransaction(postRef, (post) => {
      if (post) {
        if (post.likes && post.likes[uid]) {
          post.likesCount--;
          post.likes[uid] = null;
        } else {
          post.likesCount++;

          if (!post.likes) {
            post.likes = {};
          }
          post.likes[uid] = true;
        }
      }
      updates[`user-posts/${post.newPostKey}`] = post;
      return post;
    });
    update(ref(db), updates);
  }

  return (
    <div>
      <h1 className={classes.container}>Посты {username}</h1>

      {!posts.length ? (
        <h2 style={{ textAlign: "center" }}>
          {username} пока ничего не опубликовал!
        </h2>
      ) : !loading ? (
        posts.map((post) => {
          const date = new Date(post.datePost);
          return (
            <div className={classes.postData}>
              <div className={classes.posts}>
                <div className={classes.post}>
                  <span className={classes.author}>
                    {post.author} опубликовал новый пост
                  </span>
                  <span className={classes.date}>{date.toLocaleString()}</span>
                  <p className={classes.title}>{post.title}</p>
                  <span className={classes.likes}>
                    <svg
                      onClick={() => toggleStar(post.idUser, post.newPostKey)}
                      fill={!post.likes ? "" : post.likes[id] ? "red" : ""}
                      className={classes.like}
                      version="1.1"
                      viewBox="0 0 512 512"
                      width="25px"
                      height="25px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="_x31_66_x2C__Heart_x2C__Love_x2C__Like_x2C__Twitter">
                        <g>
                          <path d="M365.4,59.628c60.56,0,109.6,49.03,109.6,109.47c0,109.47-109.6,171.8-219.06,281.271    C146.47,340.898,37,278.568,37,169.099c0-60.44,49.04-109.47,109.47-109.47c54.73,0,82.1,27.37,109.47,82.1    C283.3,86.999,310.67,59.628,365.4,59.628z" />
                        </g>
                      </g>
                    </svg>
                    <b>{post.likesCount}</b>
                  </span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default PostsUser;
