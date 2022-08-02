import React from "react";
import { Link } from "react-router-dom";
import Register from "../../components/Register/Register";

const RegisterPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "1920px",
        width: "100%",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        Привет!
        <br /> Давай создадим твой аккаунт
      </h1>
      <Register />
      <p>
        Есть аккаунт?
        <Link to="/login" style={{ marginLeft: "10px" }}>
          Авторизуйтесь
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
