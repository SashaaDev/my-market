import React, {useContext, useEffect} from "react";
import {REGISTRATION_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/constants";
import {useForm} from "react-hook-form";
import {Link, useLocation, useNavigate} from "react-router-dom";
import opacityAppear from "./anim";
import axios from "axios";
import "../index.css";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Context} from "../index";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const notify = () => toast("Ви увійшли!");
  const errorNotify = () => toast.error("Сталась помилка!",{
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  const context = useContext(Context);
  const user = context?.user;
  const navigation = useNavigate()
  const onSubmit = async (data: any, e: any) => {
    if (Object.keys(errors).length > 0) {
      e.preventDefault();
      return errors;
    }
    console.log(data);
    try {
      const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/login`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
      );
      const token = response.data;
      user?.setIsAuth(true);
      user?.setUserFromToken(token);
      console.log(user);
      navigation(SHOP_ROUTE);
      notify();
      console.log('Logged successful:', response.data);
      localStorage.setItem('token', token);
    } catch (error) {
      errorNotify();
      console.log('Error:', error);
    }
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
        <div className="login-wrapper">
          <ToastContainer/>
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
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    minLength: {
                      value: 3,
                      message: "Email must be at least 3 characters long",
                    },
                    maxLength: {
                      value: 30,
                      message: "Email cannot exceed 30 characters",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                      message: "Email must be a valid gmail address"
                    }
                  })}
              />
              <i className="fa-solid fa-envelope"></i>
            </div>
            {errors.email && (
                <p className="error">{errors.email.message as string}</p>
            )}

            <div className="input-wrapper">
              <input
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  id="password"
                  {...register("password", {
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
            {errors.password && (
                <p className="error">{errors.password.message as string}</p>
            )}
            <div className="login-wrapper-btn">
              <div className="input-wrapper">
                <span className="faq">Don`t have an account? </span>
                <Link className="reg" to={REGISTRATION_ROUTE}>
                  Registration
                </Link>
              </div>
              <div className="input-wrapper">
                {/*<Link to={SHOP_ROUTE}>*/}
                  <button className="button" type="submit">
                    Sign In
                    <i className="bx bx-right-arrow-alt"></i>
                  </button>
                {/*</Link>*/}
              </div>
            </div>
          </div>
        </div>
      </form>
  );
};

export default LoginPage;
