import React, {useContext, useEffect} from "react";
import {REGISTRATION_ROUTE, LOGIN_ROUTE} from "../utils/constants";
import {useForm} from "react-hook-form";
import {Link, useLocation} from "react-router-dom";
import opacityAppear from "./anim";
// import axios from "axios";
import "../index.css";
// import {toast, ToastContainer} from "react-toastify";
import {Context} from "../index";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();
  // const notify = () => toast("Ви зареєструвались!");
  const context = useContext(Context);
  const user = context?.user;
  let state = user?.isAuth;
  const onSubmit = async (data: any, e: any) => {
    if (Object.keys(errors).length > 0) {
      e.preventDefault();
      return errors;
    }
    // notify();
    //   try {
    //     console.log(data);
    //     const response = await axios.post(
    //         `${process.env.BACKEND_URL}/client`,
    //         data,
    //         {
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //         }
    //     );
    //
    //
    //     console.log('Registration successful:', response.data);
    //   } catch (error) {
    //     console.log('Error:', error);
    //   }
  };

  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  useEffect(() => {
    const wrapper = document.querySelector(".login-wrapper");
    if (wrapper instanceof HTMLElement) {
      opacityAppear(wrapper);
    }
  }, [isLogin]);

  return (
      <form
          className="form"
          id="form"
          method="post"
          name="form"
          onSubmit={handleSubmit(onSubmit)}
      >
        {/*<div className={isLogin ? "login-wrapper" : "reg-wrapper"}>*/}
        <div className="login-wrapper">

          {/*{!user.isAuth ? <ToastContainer/> : null}*/}
          <h1 className="title">{isLogin ? "Welcome Back" : "Registration"}</h1>
          <p className={isLogin ? "description" : "description register"}>
            Enter your credentials to continue.
          </p>
          <div className="login">
            <div className="input-wrapper">
              <input
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  id="login_email"
                  {...register("login_email", {
                    required: "Email is required",
                    minLength: {
                      value: 3,
                      message: "Email must be at least 3 characters long",
                    },
                    maxLength: {
                      value: 30,
                      message: "Email cannot exceed 30 characters",
                    },
                  })}
              />
              <i className="fa-solid fa-envelope"></i>
            </div>
            {/*{errors.login_email && (*/}
            {/*    <p className="error">{errors.login_email.message}</p>*/}
            {/*)}*/}

            <div className="input-wrapper">
              <input
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  id="login_password"
                  {...register("login_password", {
                    required: "Password is required",
                    minLength: {
                      value: 3,
                      message: "Password must be at least 3 characters long",
                    },
                    maxLength: {
                      value: 30,
                      message: "Password cannot exceed 30 characters",
                    },
                  })}
              />
              <i className="fa-solid fa-lock"></i>
            </div>
            {/*{errors.login_password && (*/}
            {/*    <p className="error">{errors.login_password.message}</p>*/}
            {/*)}*/}
            <div className="login-wrapper-btn">
              <div className="input-wrapper">
                <span className="faq">Don`t have an account? </span>
                <Link className="reg" to={REGISTRATION_ROUTE}>
                  Registration
                </Link>
              </div>
              <div className="input-wrapper">
                <button className="button" type="submit">
                  Sign In
                  <i className="bx bx-right-arrow-alt"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
  );
};

export default LoginPage;