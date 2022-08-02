import React from "react";
import { useState } from "react";
import classes from "./Form.module.css";

const Form = ({ title, handleClick }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
      <div className={classes.formItem}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Введите Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={classes.formItem}>
        <label>Пароль</label>
        <input
          type="password"
          placeholder="Введите пароль"
          required
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
      </div>
      <button type="submit" onClick={() => handleClick(email, pass)}>
        {title}
      </button>
    </form>
  );
};

export default Form;
