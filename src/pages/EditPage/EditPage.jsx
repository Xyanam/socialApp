import React from "react";
import classes from "./EditPage.module.css";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { setUser } from "../../redux/slices/userSlice";
import { useState } from "react";
import { getDatabase, ref, update } from "firebase/database";
import { useNavigate } from "react-router-dom";
const EditPage = () => {
  const navigate = useNavigate();
  const { id } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [names, setName] = useState("");
  const [statuss, setStatus] = useState("");
  const [city, setCity] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const db = getDatabase();

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImageUrl(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  function addToDb(name, status, city, image, idUser) {
    const infoData = {
      username: name,
      status: status,
      city: city,
      imageUrl: image,
      idUser,
      friends: [],
    };

    dispatch(
      setUser({
        name,
        status,
        city,
        imageUrl,
        idUser,
      })
    );

    const updates = {};
    updates[`users/${id}`] = infoData;

    navigate(`/profile/${id}`);
    return update(ref(db), updates);
  }

  return (
    <form className={classes.container}>
      <h1 className={classes.title}>Расскажите о себе: </h1>
      <div className={classes.form}>
        <div className={classes.formItems}>
          <label>Введите Имя</label>
          <input
            type="text"
            value={names}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={classes.formItems}>
          <label>Введите статус(не обязательно)</label>
          <input
            type="text"
            value={statuss}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div className={classes.formItems}>
          <label>Введите город</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className={classes.avaBlock}>
          <div>
            <label htmlFor="input" className={classes.setAvatar}>
              Установите аватарку +
            </label>
            <input
              type="file"
              id="input"
              className={classes.chooseAva}
              onChange={imageHandler}
              required
            />
          </div>
          <div className={classes.yourImage}>
            Ваша Аватарка:
            <img src={imageUrl} className={classes.image} alt="" />
          </div>
        </div>

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            addToDb(names, statuss, city, imageUrl, id);
          }}
        >
          Сохранить
        </button>
      </div>
    </form>
  );
};

export default EditPage;
