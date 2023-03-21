import React, { useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { Navigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./Form.module.scss";
import Error from "../HelperComponents/Error";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setErr, setUser } from "../../redux/reducers/userSlice";
import { useAuth } from "../../hoc/user-auth";

const FormRegister = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const { isAuth, err } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: "onBlur" });

  if (isAuth) {
    return <Navigate to="/user-account" replace={true} />;
  }

  const onSubmit = async ({ email, password, repeatPassword, remember }) => {
    dispatch(setErr({ err: null }));

    if (password === repeatPassword) {
      const auth = getAuth();
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        console.log(res);
        const user = {
          email: res.user.email,
          token: res.user.accessToken,
          id: res.user.uid,
        };
        if (remember) {
          localStorage.setItem("user", JSON.stringify(user));
        }
        dispatch(setUser(user));
      } catch (err) {
        console.log(err);
        dispatch(setErr({ err: err.message }));
      }
    }
    reset();
  };

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form__wrapper}
    >
      {err && <Error error={err} />}
      <input
        {...register("id", { required: "This field is required" })}
        type="id"
        placeholder={
          errors?.id?.message ? `Username: ${errors.id.message}` : "Username"
        }
      />
      <input
        {...register("email", { required: "This field is required" })}
        type="email"
        placeholder={
          errors?.email?.message ? `Email: ${errors.email.message}` : "Email"
        }
      />
      <input
        {...register("password", {
          required: "This field is required",
        })}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder={
          errors?.password?.message
            ? `Password: ${errors.password.message}`
            : "Password"
        }
      />
      <input
        {...register("repeatPassword", {
          required: "This field is required",
        })}
        type="password"
        onChange={(e) => setRepeatPassword(e.target.value)}
        placeholder={
          errors?.repeatPassword?.message
            ? `Repeat password: ${errors.repeatPassword.message}`
            : "Repeat password"
        }
      />
      <div className="ui checkbox">
        <input {...register("remember")} type="checkbox" />
        <label className="!text-stone-300">Remember me</label>
      </div>
      <div className={styles.form__pass_status}>
        {password !== repeatPassword && "Please repeat the password correctly"}
      </div>
      <button type="submit">Register</button>
      <Link className={styles.form__link} to="/sign-in">
        Already have an account? <br /> Login
      </Link>
    </form>
  );
};

export default FormRegister;
