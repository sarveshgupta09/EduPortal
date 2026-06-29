import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiUser3Line,
  RiMailLine,
  RiLockPasswordLine,
  RiEyeLine,
  RiEyeOffLine,
  RiLoader5Line,
  RiSunLine,
  RiMoonClearLine,
  RiArrowLeftLine,
  RiShieldUserLine,
} from "react-icons/ri";
import API from "../Services";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Student"); // Default to Student
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  // Keep dark/light mode theme consistent
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const register = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    setIsLoading(true);
    try {
      const details = await axios.post(`${API}/signup`, {
        name,
        email,
        password,
        role,
      });
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setName("");
      toast.success("Registration Successful");
      setTimeout(() => {
        setIsLoading(false);
        navigate("/login");
      }, 2500);
      console.log(details);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-205 transition-colors duration-300 flex flex-col relative overflow-x-hidden select-none">
      
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] -right-[10%] w-96 h-96 rounded-full bg-blue-500/10 dark:bg-blue-600/5 blur-3xl animate-blob"></div>
        <div className="absolute bottom-[10%] -left-[10%] w-96 h-96 rounded-full bg-indigo-500/10 dark:bg-indigo-600/5 blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-md bg-white/70 dark:bg-slate-950/70 border-b border-slate-200/50 dark:border-slate-900/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-5">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
              <span className="text-white text-md font-bold">C</span>
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              EduPortal
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-450 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer"
            >
              {darkMode ? <RiSunLine className="w-5 h-5" /> : <RiMoonClearLine className="w-5 h-5" />}
            </button>

            <button
              onClick={() => navigate("/login")}
              className="bg-indigo-600 text-white hover:brightness-105 active:scale-95 px-5 py-2 rounded-xl text-sm font-semibold transition cursor-pointer"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6 relative z-10 my-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/60 p-8 rounded-3xl shadow-2xl dark:shadow-slate-950/20"
        >
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Create an Account
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
              Sign up today to join your institutional workspace system.
            </p>
          </div>

          <form onSubmit={register} className="space-y-5">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 dark:text-slate-500 pointer-events-none">
                  <RiUser3Line className="w-5 h-5" />
                </span>
                <input
                  type="text"
                  value={name}
                  disabled={isLoading}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:focus:border-transparent text-sm transition-all text-slate-800 dark:text-slate-200"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 dark:text-slate-500 pointer-events-none">
                  <RiMailLine className="w-5 h-5" />
                </span>
                <input
                  type="email"
                  value={email}
                  disabled={isLoading}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@institution.edu"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:focus:border-transparent text-sm transition-all text-slate-800 dark:text-slate-200"
                  required
                />
              </div>
            </div>

            {/* Password Fields Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 dark:text-slate-500 pointer-events-none">
                    <RiLockPasswordLine className="w-5 h-5" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    disabled={isLoading}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-10 py-3 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:focus:border-transparent text-sm transition-all text-slate-800 dark:text-slate-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? (
                      <RiEyeOffLine className="w-4 h-4" />
                    ) : (
                      <RiEyeLine className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Confirm Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 dark:text-slate-500 pointer-events-none">
                    <RiLockPasswordLine className="w-5 h-5" />
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    disabled={isLoading}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-11 pr-10 py-3 bg-slate-50/50 dark:bg-slate-950/50 border ${
                      confirmPassword && password !== confirmPassword
                        ? "border-red-500 focus:ring-red-500"
                        : "border-slate-200 dark:border-slate-800 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                    } rounded-xl outline-none focus:ring-2 focus:border-transparent dark:focus:border-transparent text-sm transition-all text-slate-800 dark:text-slate-200`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <RiEyeOffLine className="w-4 h-4" />
                    ) : (
                      <RiEyeLine className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Role Custom Card Selector */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Registering As
              </label>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Student Selector */}
                <div
                  onClick={() => !isLoading && setRole("Student")}
                  className={`p-4 rounded-2xl border-2 flex flex-col items-center text-center cursor-pointer transition-all duration-200 ${
                    role === "Student"
                      ? "border-indigo-600 bg-indigo-50/20 dark:border-indigo-400 dark:bg-indigo-950/20 shadow-md shadow-indigo-500/5"
                      : "border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700"
                  }`}
                >
                  <RiUser3Line className={`w-8 h-8 mb-2 ${role === "Student" ? "text-indigo-650 dark:text-indigo-400" : "text-slate-400"}`} />
                  <span className={`text-sm font-bold ${role === "Student" ? "text-indigo-650 dark:text-indigo-400" : "text-slate-650 dark:text-slate-300"}`}>Student</span>
                  <span className="text-[10px] text-slate-450 dark:text-slate-500 mt-1">Submit & track items</span>
                </div>

                {/* Teacher Selector */}
                <div
                  onClick={() => !isLoading && setRole("Teacher")}
                  className={`p-4 rounded-2xl border-2 flex flex-col items-center text-center cursor-pointer transition-all duration-200 ${
                    role === "Teacher"
                      ? "border-indigo-600 bg-indigo-50/20 dark:border-indigo-400 dark:bg-indigo-950/20 shadow-md shadow-indigo-500/5"
                      : "border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700"
                  }`}
                >
                  <RiShieldUserLine className={`w-8 h-8 mb-2 ${role === "Teacher" ? "text-indigo-650 dark:text-indigo-400" : "text-slate-405"}`} />
                  <span className={`text-sm font-bold ${role === "Teacher" ? "text-indigo-650 dark:text-indigo-400" : "text-slate-650 dark:text-slate-300"}`}>Teacher</span>
                  <span className="text-[10px] text-slate-450 dark:text-slate-500 mt-1">Manage & grade items</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: isLoading ? 1 : 1.01 }}
              whileTap={{ scale: isLoading ? 1 : 0.99 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-500/20 hover:brightness-105 active:scale-95 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <RiLoader5Line className="w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </motion.button>
          </form>

          {/* Form Footer */}
          <div className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Log In
            </span>
          </div>

          <div className="mt-5 flex justify-center">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-350 transition-colors"
            >
              <RiArrowLeftLine className="w-3.5 h-3.5" /> Back to home
            </button>
          </div>
        </motion.div>
      </main>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
};

export default Register;
