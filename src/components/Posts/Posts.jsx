import React, { createRef } from "react";
import { useSelector } from "react-redux/es/exports";
import classes from "./Posts.module.css";
import {
  getDatabase,
  ref,
  child,
  push,
  update,
  onValue,
  runTransaction,
  remove,
} from "firebase/database";
import { useListKeys } from "react-firebase-hooks/database";
import { useDispatch } from "react-redux/es/exports";
import Loader from "../Loader/Loader";

const Posts = ({ username }) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user);
  const inputRef = createRef();
  const db = getDatabase();

  const [keys, loading] = useListKeys(ref(db, `users/${id}/posts`));

  function addPostToDb(username, text, idPost) {
    const newPostKey = push(child(ref(db), "posts")).key;

    const postData = {
      author: username,
      postId: idPost,
      title: text,
      likesCount: 0,
      likes: [],
      newPostKey: newPostKey,
      idUser: id,
      datePost: idPost,
    };

    const updates = {};
    updates[`users/${id}/posts/${newPostKey}`] = postData;
    updates[`/user-posts/${newPostKey}`] = postData;
    return update(ref(db), updates);
  }
  let news = [];

  const postsData = ref(db, `users/${id}/posts`);

  onValue(postsData, (snapshot) => {
    const data = snapshot.val();
    keys.map((key) => news.unshift(data[key]));
  });

  function removePost(uid, postId) {
    const removeCurrentPost = remove(ref(db, `users/${uid}/posts/${postId}`));
    const updates = {};

    updates[`user-posts/${postId}`] = removeCurrentPost;
    update(ref(db), updates);
  }

  function toggleStar(uid, postId) {
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

  const time = Date.now();

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className={classes.postData}>
          <h1>Посты {username}</h1>
          <div>
            <input type="text" ref={inputRef} placeholder="Что у вас нового?" />
            <button
              className={classes.send}
              onClick={() => {
                addPostToDb(username, inputRef.current.value, time);
                inputRef.current.value = "";
              }}
            >
              Опубликовать
            </button>
          </div>
          <div className={classes.posts}>
            {!news.length ? (
              <h2>{username} пока ничего не опубликовал!</h2>
            ) : (
              news.map((post, index) => {
                const date = new Date(post.datePost);
                return (
                  <div key={post.datePost} className={classes.post}>
                    <span className={classes.author}>
                      {post.author} опубликовал новый пост
                    </span>
                    <span className={classes.date}>
                      {date.toLocaleString()}
                    </span>
                    <svg
                      onClick={() => removePost(post.idUser, post.newPostKey)}
                      className={classes.remove}
                      width="17px"
                      height="17px"
                      viewBox="0 0 17 17"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Удалить пост</title>

                      <defs></defs>
                      <g
                        id="Icons"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                        strokeLinecap="round"
                      >
                        <g
                          id="24-px-Icons"
                          transform="translate(-364.000000, -124.000000)"
                          stroke="#000000"
                        >
                          <g
                            id="ic_cancel"
                            transform="translate(360.000000, 120.000000)"
                          >
                            <g id="cross">
                              <g
                                transform="translate(5.000000, 5.000000)"
                                strokeWidth="2"
                              >
                                <path
                                  d="M0,0 L14.1421356,14.1421356"
                                  id="Line"
                                ></path>
                                <path
                                  d="M14,0 L1.77635684e-15,14"
                                  id="Line"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                    <p className={classes.title}>{post.title}</p>
                    <span className={classes.likes}>
                      <svg
                        onClick={() => {
                          toggleStar(post.idUser, post.newPostKey);
                        }}
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
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
