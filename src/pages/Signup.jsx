import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function SignUp() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onChange" });
  const pwd = watch("password");

  // Custom validation for password
  const validatePassword = (value) => {
    return value.length >= 8 || "Password must be at least 8 characters";
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        "https://back-gnox.onrender.com/api/v1/auth/signup",

        {
          userName: data.userName,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }
      );
      if (res.data.message) {
        console.log(res.data);
        localStorage.setItem("token", res.data?.token);
        localStorage.setItem("user", JSON.stringify(res.data?.data));
        toast.success("created successfully");
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1500);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      let newError = [];
      if (err.response) {
        newError = err.response.data.errors.map((err) => err.msg);
      }
      newError.forEach((err) => {
        toast.error(err);
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="login ">
        <div className="container mt-1">
          <div className="image">
            <img src="/public/login.avif"></img>
          </div>
          <div className="content">
            <div className="main-heading">
              <h2>Sign up</h2>
            </div>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="email">
                <input
                  type="text"
                  placeholder="userName"
                  name="userName"
                  {...register("userName", {
                    required: "userName is required",
                  })}
                ></input>
                {errors.userName && (
                  <span className="my-2 ml-2 block w-full text-sm text-red-500 font-bold">
                    {errors.userName.message}
                  </span>
                )}
              </div>
              <div className="email">
                <input
                  type="email"
                  placeholder="example@example.com"
                  name="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address",
                    },
                  })}
                ></input>
                {errors.email && (
                  <span className="my-2 ml-2 block w-full text-sm text-red-500 font-bold">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="password">
                <input
                  {...register("password", {
                    required: "password is required",
                    validate: validatePassword,
                  })}
                  type="password"
                  placeholder="password"
                  name="password"
                ></input>
                {errors.password?.type && (
                  <span className="my-0 ml-2 text-sm block w-full text-red-500 font-bold relative top-[10px]">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="password">
                <input
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) =>
                      value == pwd || "Passwords do not match",
                  })}
                  type="password"
                  placeholder="confirm password"
                />
                {errors.confirmPassword?.type === "required" && (
                  <span className="my-0 ml-2 text-sm block w-full text-red-500 font-bold relative top-[10px]">
                    Confirm Password is required
                  </span>
                )}
                {errors.confirmPassword?.type === "validate" && (
                  <span className="my-0 ml-2 text-sm block w-full text-red-500 font-bold relative top-[10px]">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              {isLoading ? (
                <ThreeDots
                  wrapperClass="text-primary flex justify-center items-center"
                  color="#2196f3"
                />
              ) : (
                <button type="submit" value="">
                  sign up
                </button>
              )}
            </form>
            <Link to="/login" className="signup ">
              Do you have an account ?{" "}
              <span className="hover:text-blue-400">login</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
