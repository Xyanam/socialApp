import React, { useEffect, useState } from "react";
import classes from "./ProfilePage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { removeUser, setUser } from "../../redux/slices/userSlice";
import { getDatabase, ref, child, get } from "firebase/database";

import Posts from "../../components/Posts/Posts";
import Loader from "../../components/Loader/Loader";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/login");
    }
  }, []);

  const [userData, setUserData] = useState();
  const [userAuth, setUserAuth] = useState();

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        dispatch(setUser({ id: uid }));
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
            let user = snapshot.val();
            setUserData(user);
          }
        });
        setUserAuth(true);
      } else {
        setUserAuth(false);
      }
    });
  }, []);

  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
      })
      .catch(() => alert("Ошибка! Попробуйте позже!"));
    navigate("/login");
  };

  return (
    <div className={classes.container}>
      {!userData || !userAuth ? (
        <Loader />
      ) : (
        <>
          <div className={classes.block}>
            <div className={classes.avatar}>
              <img src={userData.imageUrl} alt="" />
            </div>
            <div className={classes.infoBlock}>
              <span className={classes.name}>{userData.username}</span>
              <span className={classes.status}>{userData.status}</span>
              <span className={classes.city}>Ваш город: {userData.city}</span>
              <div className={classes.buttonBlock}>
                <div className={classes.friends}>
                  <b>
                    {!userData.friends
                      ? 0
                      : Object.keys(userData.friends).length}
                  </b>
                  <br />
                  Друзей
                </div>
                <div className={classes.change}>
                  <Link
                    to={`/profile/${id}/edit`}
                    className={classes.changeLink}
                  >
                    Поменять данные(beta)
                  </Link>
                </div>
                <div className={classes.btn}>
                  <button onClick={logout} className={classes.logOut}>
                    Выйти из аккаунта
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.postsContainer}>
            <Posts username={userData.username} uid={userData} />
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
