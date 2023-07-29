import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  // Custom validation for password
  const validatePassword = (value) => {
    return value.length >= 8 || "Password must be at least 8 characters";
  };
  // handle showPassword
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        "https://back-gnox.onrender.com/api/v1/auth/login",

        {
          email: data.email,
          password: data.password,
        }
      );
      if (res.data.message) {
        localStorage.setItem("token", res.data?.token);
        localStorage.setItem("user", JSON.stringify(res.data?.user));
        toast.success("Login successfully");
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1500);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.response.data) {
        toast.error("incorrect email or password");
      }
    }
  };

  const onSuccess = async (credentialResponse) => {
    if (credentialResponse) {
      document.body.style.overflowX = "hidden";
      try {
        setIsLoading(true);
        const { data } = await axios.post(
          "https://back-gnox.onrender.com/api/v1/auth/googleLogin",
          { googleToken: credentialResponse.credential }
        );
        if (data.message == "login success") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          toast.success("login success");
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 1500);
        }
      } catch (err) {
        console.log(err);
        if (err.response) {
          toast.error(err.response.data.message);
        }
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="login">
        <div className="container">
          <div className="image">
            <img src="/login.avif"></img>
          </div>
          <div className="content">
            <div className="main-heading">
              <h2>Sign in</h2>
            </div>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="email">
                <i className="fa-solid fa-user"></i>
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
                <i
                  className={`${
                    showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
                  } cursor-pointer`}
                  onClick={handleShowPassword}
                ></i>
                <input
                  {...register("password", {
                    required: "password is required",
                    validate: validatePassword,
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  name="password"
                ></input>
                {errors.password?.type && (
                  <span className="my-0 ml-2 text-sm block w-full text-red-500 font-bold relative top-[10px]">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="flex justify-center">
                <GoogleLogin onSuccess={onSuccess} />
              </div>
              {isLoading ? (
                <ThreeDots
                  wrapperClass="text-primary flex justify-center items-center"
                  color="#2196f3"
                />
              ) : (
                <button type="submit" value="">
                  sign in
                </button>
              )}
            </form>
            <Link to="/signup" className="signup">
              Do not have an account ? <span>Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
