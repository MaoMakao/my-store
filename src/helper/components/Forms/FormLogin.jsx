import React from "react";
import { useDispatch } from "react-redux/es/exports";
import { Navigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Error from "../HelperComponents/Error";
import styles from "./Form.module.scss";
import { useAuth } from "./../../hoc/user-auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setErr, setUser } from "../../redux/reducers/userSlice";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const FormLogin = () => {
  const dispatch = useDispatch();
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

  const onSubmit = async ({ email, password, remember }) => {
    dispatch(setErr({ err: null }));

    const auth = getAuth();
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
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

    reset();
  };

  const onGoogleSubmit = async () => {
    dispatch(setErr({ err: null }));
    const provider = new GoogleAuthProvider();

    const auth = getAuth();
    try {
      const res = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(res);
      const user = {
        email: res.user.email,
        token: credential.accessToken,
        id: res.user.uid,
      };

      console.log(res);

      localStorage.setItem("user", JSON.stringify(user));

      dispatch(setUser(user));
    } catch (err) {
      console.log(err);
      dispatch(setErr({ err: err.message }));
    }

    reset();
  };

  return (
    <div className="    ">
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form__wrapper}
      >
        <div className={styles.form__text}>
          Sign-in or register to watch your order status
        </div>

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
          placeholder={
            errors?.password?.message
              ? `Password: ${errors.password.message}`
              : "Password"
          }
        />
        <div className="ui checkbox">
          <input {...register("remember")} type="checkbox" />
          <label className="!text-stone-300">Remember me</label>
        </div>
        {err && <Error error={err} />}
        <button type="submit">Login</button>
        <Link className={styles.form__link} to="/register">
          Don't have an account?
          <br /> Register
        </Link>
      </form>
      <div className="  flex w-full justify-center ">
        <button
          className="  flex justify-center select-none uppercase whitespace-nowrap bg-blue-500 bg-opacity-70 w-56 px-8  lg:w-64 py-5 text-base tracking-widest font-thin hover:bg-opacity-100 my-10"
          onClick={() => onGoogleSubmit()}
        >
          login with Google
        </button>
      </div>
    </div>
  );
};

export default FormLogin;
