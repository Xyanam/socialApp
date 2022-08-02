import React from "react";
import { useDispatch } from "react-redux/es/exports";
import Form from "../Form/Form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRegister = (email, password) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        );

        navigate(`/profile/${user.uid}/edit`);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return <Form title="Зарегистрироваться" handleClick={handleRegister} />;
};

export default Register;
