import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosCheckboxOutline } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import loginImage from "/Background/loginImage.png";
import { login } from "../apis/service";
import Footer from "../components/Footer";

function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!formData.username) validationErrors.username = "Username is required.";
    if (!formData.password) validationErrors.password = "Password is required.";
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        const response = await login(formData);
        setLoading(false);
        if (response.success) {
          const { token, message } = response;
          if (rememberMe) {
            localStorage.setItem("token", token);
          } else {
            sessionStorage.setItem("token", token);
          }
          toast.success(message || "Login successful!");
          navigate("/microdashboard");
        } else {
          toast.error(response.message || "Invalid username or password.");
        }
      } catch (error) {
        setLoading(false);
        console.error("Login error:", error.response || error.message);
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="w-screen h-full bg-[#171f31]/85 flex items-center flex-col justify-center">
      <div className="grid h-[85%] w-[95vw] rounded-lg grid-cols-2 items-center overflow-hidden relative">
        {/* Close Icon */}
        <div className=" flex z-10 absolute right-2 top-12 text-3xl text-[#21fc0d] cursor-pointer">
          <IoCloseSharp />
        </div>
        {/* Form Container */}
        <div className="flex flex-col mt-7 items-center justify-center w-full h-[80%] text-white rounded-lg bg-white/5 space-y-1">
          <h2 className="text-3xl text-center ">
            <strong>Hitachi Digital Solution</strong>
          </h2>
          <p className="text-2xl text-center mt-7">
            Hitachi-EARN (
            <b>
              <u>E</u>
            </b>
            nterprise{" "}
            <b>
              <u>A</u>
            </b>
            sset-based{" "}
            <b>
              <u>R</u>
            </b>
            evenue{" "}
            <b>
              <u>N</u>
            </b>
            etwork)
          </p>

          <form
            className="flex flex-col items-center justify-center w-full gap-3 mt-5"
            onSubmit={handleSubmit}
          >
            {/* Username Field */}
            <div className="relative w-[60%]">
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                autoComplete="off"
                className="w-full  mt-5 px-4 py-2 bg-[#293a56] text-white border-l-4 border-[#21fc0d] outline-none"
              />
              {errors.username && (
                <span className="text-sm text-red-500">{errors.username}</span>
              )}
            </div>

            {/* Password Field */}
            <div className="relative w-[60%]">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-[#293a56] text-white border-l-4 border-[#21fc0d] outline-none"
              />
              {errors.password && (
                <span className="text-sm text-red-500">{errors.password}</span>
              )}
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex justify-between items-center w-[60%]">
              <label className="flex items-center gap-2 text-sm font-poppins">
                {rememberMe ? (
                  <IoIosCheckboxOutline
                    onClick={() => setRememberMe(!rememberMe)}
                    className="w-6 h-6 text-[#21fc0d] cursor-pointer"
                  />
                ) : (
                  <MdOutlineCheckBoxOutlineBlank
                    onClick={() => setRememberMe(!rememberMe)}
                    className="w-6 h-6 text-[#21fc0d] cursor-pointer"
                  />
                )}
                <span className="text-xl text-white">Remember me</span>
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className={`px-10 py-2 bg-[#293a56] text-white border-2 border-[#21fc0d] rounded-lg text-sm uppercase font-bold hover:bg-[#448b3d] mt-8 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
        {/* Image Container */}
        <div className="w-full h-[80%] mt-7 flex justify-center items-center border-2 border-[#21fc0d] rounded-lg">
          <img
            src={"/Background/LoginImage.png"}
            alt="Login Background"
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LoginForm;
