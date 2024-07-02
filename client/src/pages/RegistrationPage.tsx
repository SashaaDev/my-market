import React, {useContext, useEffect} from "react";
import {REGISTRATION_ROUTE, LOGIN_ROUTE} from "../utils/constants";
import {useForm} from "react-hook-form";
import {Link, useLocation} from "react-router-dom";
// import axios from "axios";
import "../index.css";
// import {toast, ToastContainer} from "react-toastify";
import {Context} from "../index";
import opacityAppear from "./anim";

const RegistrationPage = () => {
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
    const wrapper = document.querySelector(".reg-wrapper");
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
        <div className="reg-wrapper">

          {/*{!user.isAuth ? <ToastContainer/> : null}*/}
          <h1 className="title">{isLogin ? "Welcome Back" : "Registration"}</h1>
          <p className={isLogin ? "description" : "description register"}>
            Enter your credentials to continue.
          </p>
          <div className="registration">
            <div className="input-wrapper">
              <input
                  type="text"
                  placeholder="Enter your phone number"
                  title="Enter your phone number"
                  inputMode="numeric"
                  id="contactNumber"
                  {...register("contactNumber", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[+]?[0-9]{10,13}$/,
                      message: "Phone number must be a valid format",
                    },
                  })}
              />
              <i className="fa-solid fa-phone"></i>
            </div>
            {/*{errors.contactNumber && (*/}
            {/*    <p className="error">{errors.contactNumber.message}</p>*/}
            {/*)}*/}

            <div className="input-wrapper">
              <input
                  type="text"
                  placeholder="Enter your name"
                  autoComplete="name"
                  id="fullName"
                  {...register("fullName", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters long",
                    },
                    maxLength: {
                      value: 30,
                      message: "Name cannot exceed 30 characters",
                    },
                    pattern: {
                      value: /^[a-zA-Zа-яА-Я]+$/,
                      message: "Name must only contain letters",
                    },
                  })}
              />
              <i className="fa-solid fa-user"></i>
            </div>
            {/*{errors.fullName && <p className="error">{errors.fullName.message}</p>}*/}

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
                      message: "Email must be a valid gmail address",
                    },
                  })}
              />
              <i className="fa-solid fa-envelope"></i>
            </div>
            {/*{errors.email && <p className="error">{errors.email.message}</p>}*/}

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
            {/*{errors.password && (*/}
            {/*    <p className="error">{errors.password.message}</p>*/}
            {/*)}*/}
            <div className="input-wrapper">
              <span className="faq">Have an account? </span>
              <Link className="reg" to={LOGIN_ROUTE}> Sign In</Link>
            </div>
            {/*<div onClick={notify} className="input-wrapper">*/}
            <div className="input-wrapper">
              <button onClick={() => user?.setIsAuth(true)} className="button" type="submit" id="submit">
                Sign Up<i className="bx bx-right-arrow-alt"></i>
              </button>
            </div>
          </div>

        </div>
      </form>
  );
};

export default RegistrationPage;