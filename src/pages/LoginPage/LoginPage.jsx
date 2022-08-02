import React from "react";
import { Link } from "react-router-dom";
import Login from "../../components/Login/Login";
const LoginPage = () => {
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
      <h1>Авторизация</h1>
      <Login />
      <p>
        Нет аккаунта?
        <Link to="/register" style={{ marginLeft: "10px" }}>
          Зарегистрируйтесь
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
