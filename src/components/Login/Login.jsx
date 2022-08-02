import React from "react";
import Form from "../Form/Form";
import { useDispatch } from "react-redux/es/exports";
import { setUser } from "../../redux/slices/userSlice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        );

        navigate(`/profile/${user.uid}`);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return <Form title="Войти" handleClick={handleLogin} />;
};

export default Login;
