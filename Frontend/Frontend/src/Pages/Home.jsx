// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiSunLine,
  RiMoonClearLine,
  RiMenu3Line,
  RiCloseLine,
  RiUser3Line,
  RiShieldUserLine,
  RiFolderUploadLine,
  RiBookOpenLine,
  RiNotification3Line,
  RiLineChartLine,
  RiGithubFill,
  RiTwitterFill,
  RiLinkedinBoxFill,
  RiArrowRightLine,
  RiTeamLine,
  RiAwardLine,
  RiCustomerService2Line,
} from "react-icons/ri";

const Home = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  // Handle Dark/Light mode theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Typing animation configuration
  const words = [
    "Student Projects",
    "Teacher Approvals",
    "Assignment Portals",
    "Real-time Updates",
  ];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const activeWord = words[currentWordIndex];
    const speed = isDeleting ? 40 : 100;

    if (!isDeleting && currentText === activeWord) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    } else {
      timer = setTimeout(() => {
        setCurrentText(
          isDeleting
            ? activeWord.substring(0, currentText.length - 1)
            : activeWord.substring(0, currentText.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const featureCards = [
    {
      title: "Student Dashboard",
      desc: "An intuitive space for students to monitor grades, assignments, and submit project profiles.",
      icon: <RiUser3Line className="w-8 h-8 text-indigo-500" />,
      color: "from-blue-500/10 to-indigo-550/10",
    },
    {
      title: "Teacher Dashboard",
      desc: "Complete command center to grade, review submissions, and provide instant structured feedback.",
      icon: <RiShieldUserLine className="w-8 h-8 text-purple-500" />,
      color: "from-purple-500/10 to-pink-500/10",
    },
    {
      title: "Project Submission",
      desc: "Robust upload module supporting project descriptions, repositories, and direct document linkages.",
      icon: <RiFolderUploadLine className="w-8 h-8 text-teal-500" />,
      color: "from-teal-500/10 to-emerald-500/10",
    },
    {
      title: "Assignment Control",
      desc: "Effortlessly release, schedule, track, and grade submissions within a structured timeline.",
      icon: <RiBookOpenLine className="w-8 h-8 text-orange-500" />,
      color: "from-orange-500/10 to-amber-500/10",
    },
    {
      title: "Real-time Notification",
      desc: "Instant live updates on reviews, grading, deadlines, and announcement updates directly in-app.",
      icon: <RiNotification3Line className="w-8 h-8 text-red-500" />,
      color: "from-red-500/10 to-rose-500/10",
    },
    {
      title: "Performance Analytics",
      desc: "Visually review progress statistics, average scores, and analytics logs to optimize work.",
      icon: <RiLineChartLine className="w-8 h-8 text-sky-500" />,
      color: "from-sky-500/10 to-cyan-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-205 transition-colors duration-300 selection:bg-indigo-200 dark:selection:bg-indigo-900 selection:text-indigo-900 scroll-smooth overflow-x-hidden">
      
      {/* Dynamic Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[5%] w-72 h-72 rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-3xl animate-blob"></div>
        <div className="absolute top-[40%] right-[10%] w-96 h-96 rounded-full bg-purple-400/20 dark:bg-purple-600/10 blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[20%] left-[15%] w-80 h-80 rounded-full bg-pink-400/20 dark:bg-pink-600/10 blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Navbar */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 backdrop-blur-md bg-white/75 dark:bg-slate-950/75 border-b border-slate-200/50 dark:border-slate-900/50 transition-colors duration-300 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="text-white text-xl font-bold">C</span>
            </div>
            <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              EduPortal
            </span>
          </div>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-slate-650 dark:text-slate-300">
            <li>
              <a href="#hero" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
                Home
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
                Features
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
                Contact
              </a>
            </li>
          </ul>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Dark Mode Switcher */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all duration-200 cursor-pointer"
              aria-label="Toggle Theme"
            >
              {darkMode ? <RiSunLine className="w-5 h-5" /> : <RiMoonClearLine className="w-5 h-5" />}
            </button>

            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 border border-transparent transition-all duration-200 cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-indigo-500/25 hover:brightness-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex md:hidden items-center gap-3">
            {/* Theme Toggle for Mobile */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              {darkMode ? <RiSunLine className="w-5 h-5" /> : <RiMoonClearLine className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-650 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              {mobileMenuOpen ? <RiCloseLine className="w-6 h-6" /> : <RiMenu3Line className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-slate-200/50 dark:border-slate-900/50 bg-white/95 dark:bg-slate-950/95 overflow-hidden"
            >
              <div className="px-6 py-5 flex flex-col gap-4">
                <a
                  href="#hero"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-base font-medium text-slate-650 dark:text-slate-300 hover:text-indigo-600"
                >
                  Home
                </a>
                <a
                  href="#features"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-base font-medium text-slate-655 dark:text-slate-300 hover:text-indigo-600"
                >
                  Features
                </a>
                <a
                  href="#about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-base font-medium text-slate-655 dark:text-slate-300 hover:text-indigo-600"
                >
                  About
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-base font-medium text-slate-655 dark:text-slate-300 hover:text-indigo-600"
                >
                  Contact
                </a>
                <hr className="border-slate-200 dark:border-slate-900 my-2" />
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/login");
                    }}
                    className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-705 dark:text-slate-300 text-center"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/register");
                    }}
                    className="w-full py-2.5 rounded-xl bg-indigo-650 text-white text-sm font-bold text-center"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
        {/* Left column info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/50 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-405 font-bold text-xs tracking-wider uppercase mb-6 shadow-sm">
            <span>✨ Introducing CampuSphere v2.0</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Optimized for{" "}
            <span className="block h-20 text-indigo-600 dark:text-indigo-400">
              {currentText}
              <span className="animate-pulse">|</span>
            </span>
          </h1>

          <p className="text-slate-500 dark:text-slate-400 text-lg sm:text-xl mb-10 max-w-lg leading-relaxed">
            The ultimate academic administration platform. Seamlessly upload projects, coordinate assignments, verify benchmarks, and unlock real-time grading reports.
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/register")}
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:brightness-110 flex items-center gap-2 transition-all cursor-pointer"
            >
              Get Started <RiArrowRightLine className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/login")}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-xl font-bold shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer"
            >
              Login Panel
            </motion.button>
          </div>
        </motion.div>

        {/* Right column visualization */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative flex justify-center items-center"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl blur-3xl opacity-20 pointer-events-none"></div>
          <div className="relative border-4 border-white dark:border-slate-900 shadow-2xl rounded-3xl overflow-hidden aspect-[4/3] w-full max-w-md lg:max-w-lg">
            <img
              src="https://itxperts.co.in/blog/wp-content/uploads/2025/01/stmt.webp"
              alt="students illustration"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 bg-white dark:bg-slate-950/40 border-y border-slate-200/50 dark:border-slate-900/50 py-24 px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-base font-bold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase mb-3">
              Comprehensive Suite
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Powerful Management Capabilities Built Right In
            </h3>
            <p className="mt-4 text-slate-500 dark:text-slate-400 text-lg">
              Explore specialized modules engineered to automate workflow operations for both academics and instructions personnel.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featureCards.map((card, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative bg-slate-50 dark:bg-slate-900/40 border border-slate-205 dark:border-slate-800/60 p-8 rounded-2xl shadow-sm hover:shadow-xl dark:hover:shadow-indigo-950/10 hover:border-indigo-500/20 dark:hover:border-indigo-400/20 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                  {card.icon}
                </div>
                <h4 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-250">
                  {card.title}
                </h4>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 max-w-7xl mx-auto py-24 px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="space-y-6"
          >
            <h2 className="text-base font-bold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
              ABOUT OUR HUB
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Pioneering the Next Generation of Academic Excellence
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
              CampuSphere is a specialized educational dashboard dedicated to streamlining evaluations. By linking submissions tracking with intuitive reviews tools, we decrease feedback timelines from weeks to seconds.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                  <RiTeamLine className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-white">Active Growth</h5>
                  <p className="text-xs text-slate-400">Coordinating interactive communities</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                  <RiAwardLine className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-white">Secure Auditing</h5>
                  <p className="text-xs text-slate-400">Fully validated assignments scores</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="bg-gradient-to-tr from-slate-100 to-indigo-50/50 dark:from-slate-900 dark:to-indigo-950/20 p-8 rounded-3xl border border-slate-200/50 dark:border-slate-900/50 shadow-inner grid gap-6"
          >
            <div className="p-6 bg-white dark:bg-slate-950 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-900/50">
              <h4 className="font-extrabold text-lg text-slate-900 dark:text-white mb-2">⚡ Adaptive Integration</h4>
              <p className="text-slate-450 text-sm">Perfect layout adapts to mobile devices, tablets, and wide computer monitors effortlessly.</p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-950 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-900/50">
              <h4 className="font-extrabold text-lg text-slate-900 dark:text-white mb-2">🔒 Secure Operations</h4>
              <p className="text-slate-450 text-sm">Session access configurations and robust JWT validation keep student profile submissions locked safely.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 bg-indigo-600 dark:bg-indigo-950 text-white py-20 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-white opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
          <div className="text-center">
            <h4 className="text-4xl sm:text-5xl font-extrabold text-white mb-2">500+</h4>
            <p className="text-indigo-200 font-bold uppercase tracking-wider text-xs">Students Logged</p>
          </div>
          <div className="text-center">
            <h4 className="text-4xl sm:text-5xl font-extrabold text-white mb-2">50+</h4>
            <p className="text-indigo-200 font-bold uppercase tracking-wider text-xs">Certified Mentors</p>
          </div>
          <div className="text-center">
            <h4 className="text-4xl sm:text-5xl font-extrabold text-white mb-2">1000+</h4>
            <p className="text-indigo-200 font-bold uppercase tracking-wider text-xs">Project Submissions</p>
          </div>
          <div className="text-center">
            <h4 className="text-4xl sm:text-5xl font-extrabold text-white mb-2">98%</h4>
            <p className="text-indigo-200 font-bold uppercase tracking-wider text-xs">Approval Efficiency</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 max-w-5xl mx-auto py-24 px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="bg-gradient-to-r from-blue-600/5 to-indigo-600/5 dark:from-blue-500/5 dark:to-indigo-500/5 border border-indigo-200/50 dark:border-indigo-900/40 p-12 rounded-3xl shadow-xl flex flex-col items-center gap-6"
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-2">
            <RiCustomerService2Line className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">Have queries? Let's connect!</h3>
          <p className="text-slate-400 max-w-lg leading-relaxed text-sm">
            Our systems admin team is here 24/7 to resolve technical difficulties. Click get started or reach out directly via institutional assistance coordinates.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/register")}
            className="bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-8 py-3.5 rounded-xl font-bold hover:opacity-90 transition-all shadow-md cursor-pointer"
          >
            Create Your Account
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-900 dark:bg-slate-950 border-t border-slate-800 text-slate-400 py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <span className="text-white text-md font-bold">C</span>
              </div>
              <span className="text-xl font-extrabold text-white">CampuSphere</span>
            </div>
            <p className="text-sm max-w-sm">
              Simplifying educational tracking, submission reviews, and assessment coordination in a comprehensive modern portal workspace.
            </p>
          </div>
          
          <div>
            <h5 className="font-bold text-white text-sm tracking-wider uppercase mb-4">Navigations</h5>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#hero" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-bold text-white text-sm tracking-wider uppercase mb-4">Connect</h5>
            <div className="flex gap-4 mb-4">
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white transition-colors"><RiGithubFill className="w-5 h-5" /></a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white transition-colors"><RiTwitterFill className="w-5 h-5" /></a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white transition-colors"><RiLinkedinBoxFill className="w-5 h-5" /></a>
            </div>
            <p className="text-xs text-slate-550">MERN Stack Architecture Deployment</p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs gap-4 text-slate-500">
          <p>© 2026 CampuSphere Educational Systems. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Use</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;