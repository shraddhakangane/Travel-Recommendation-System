import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import toast from "react-hot-toast";
import { registerUser } from "../../api/authApi";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (form.username.trim().length < 3) {
      toast.error("Username must be at least 3 characters");
      return;
    }

    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      setLoading(true);

      const data = await registerUser({
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      console.log("Registration response:", data);

      toast.success("Registration Successful");

      navigate("/login");
    } catch (error) {
      console.error("Registration Error:", error);

      const detail = error.response?.data?.detail;

      if (Array.isArray(detail)) {
        toast.error(detail[0]?.msg || "Invalid registration data");
      } else if (typeof detail === "string") {
        toast.error(detail);
      } else {
        toast.error("Registration Failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 flex justify-center items-center px-5 py-10">

        <form
          onSubmit={handleRegister}
          className="w-full max-w-md bg-slate-900 p-10 rounded-3xl shadow-2xl border border-slate-800"
        >

          <h1 className="text-4xl text-white font-bold text-center mb-3">
            Create Account
          </h1>

          <p className="text-slate-400 text-center mb-8">
            Create your AI Travel account
          </p>

          {/* Username */}

          <div className="relative mb-5">

            <FaUser className="absolute left-4 top-4 text-cyan-400" />

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              minLength={3}
              maxLength={100}
              className="w-full bg-slate-800 text-white rounded-xl py-3 pl-12 pr-4 outline-none border border-slate-700 focus:border-cyan-400"
              required
            />

          </div>

          {/* Email */}

          <div className="relative mb-5">

            <FaEnvelope className="absolute left-4 top-4 text-cyan-400" />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-slate-800 text-white rounded-xl py-3 pl-12 pr-4 outline-none border border-slate-700 focus:border-cyan-400"
              required
            />

          </div>

          {/* Password */}

          <div className="relative mb-2">

            <FaLock className="absolute left-4 top-4 text-cyan-400" />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              minLength={8}
              maxLength={100}
              className="w-full bg-slate-800 text-white rounded-xl py-3 pl-12 pr-4 outline-none border border-slate-700 focus:border-cyan-400"
              required
            />

          </div>

          <p className="text-slate-500 text-sm mb-6">
            Password must contain at least 8 characters.
          </p>

          {/* Register button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-700 transition py-3 rounded-xl text-white text-lg font-semibold"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

          {/* Login link */}

          <p className="text-center text-slate-400 mt-6">

            Already have an account?

            <Link
              to="/login"
              className="text-cyan-400 hover:text-cyan-300 ml-2"
            >
              Login
            </Link>

          </p>

        </form>

      </div>
    </>
  );
}

export default Register;