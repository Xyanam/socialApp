import React from "react";
import { useEffect } from "react";
import classes from "./ProfileUserPage.module.css";
import PostsUser from "./PostsUser/PostsUser";
import { useParams, useNavigate } from "react-router-dom";
import {
  getDatabase,
  ref,
  onValue,
  update,
  push,
  child,
} from "firebase/database";
import { useSelector } from "react-redux";

const ProfileUserPage = () => {
  const navigate = useNavigate();
  const idUser = useParams();
  const { id } = useSelector((state) => state.user);

  useEffect(() => {
    if (!id) {
      navigate("/login");
    }
  }, []);

  const db = getDatabase();
  let userData = {};
  const userDataRef = ref(db, `users/${idUser.id}`);
  onValue(userDataRef, (snapshot) => {
    const data = snapshot.val();
    userData = data;
  });

  const addToFriends = () => {
    const newPostKey = push(child(ref(db), "users")).key;
    const updates = {};
    updates[`users/${id}/friends/${newPostKey}`] = userData;

    return update(ref(db), updates);
  };

  return (
    <div>
      <div className={classes.block}>
        <div className={classes.avatar}>
          <img src={userData.imageUrl} alt="Avatar" />
          {id === userData.idUser ? (
            ""
          ) : (
            <button className={classes.addFriend} onClick={addToFriends}>
              Добавить в друзья
              <span style={{ fontSize: "23px", marginLeft: "10px" }}>
                &#43;
              </span>
            </button>
          )}
        </div>
        <div></div>
        <div className={classes.infoBlock}>
          <span className={classes.name}>{userData.username}</span>
          <span className={classes.status}>{userData.status}</span>
          <span className={classes.city}>Город: {userData.city}</span>
        </div>
      </div>
      <div>
        <PostsUser id={userData.idUser} username={userData.username} />
      </div>
    </div>
  );
};

export default ProfileUserPage;
