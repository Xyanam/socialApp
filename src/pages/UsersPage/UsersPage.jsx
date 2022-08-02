import classes from "./UsersPage.module.css";

import React, { useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { setUsers } from "../../redux/slices/usersSlice";
import { useListKeys } from "react-firebase-hooks/database";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Loader from "../../components/Loader/Loader";

const UsersPage = () => {
  const db = getDatabase();
  const navigate = useNavigate();
  const [keys, loading] = useListKeys(ref(db, `/users`));
  const { users } = useSelector((state) => state.users);
  const { id } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) {
      navigate("/login");
    }
  }, [id]);

  const usersData = [];
  useEffect(() => {
    const allUsersRef = ref(db, "users");
    onValue(allUsersRef, (snapshot) => {
      const data = snapshot.val();
      keys.map((key) => usersData.push(data[key]));
    });
    dispatch(setUsers(usersData));
  }, [keys]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <h1>Все пользователи</h1>
        {!loading ? (
          users.map((user) => {
            return (
              <React.Fragment key={user.idUser}>
                <div className={classes.userBlock}>
                  <div className={classes.blockImg}>
                    <img src={user.imageUrl} alt="avatar" />
                  </div>
                  <div className={classes.userInfo}>
                    <Link
                      to={`/users/${user.idUser}`}
                      className={classes.title}
                      state={user.idUser}
                    >
                      {user.username}
                    </Link>
                    <span className={classes.city}>{user.city}</span>
                  </div>
                </div>
              </React.Fragment>
            );
          })
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default UsersPage;
