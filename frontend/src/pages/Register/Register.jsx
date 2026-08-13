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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await registerUser(form);

      toast.success("Registration Successful");

      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Registration Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 flex justify-center items-center px-5">

        <form
          onSubmit={handleRegister}
          className="w-full max-w-md bg-slate-900 p-10 rounded-3xl shadow-2xl"
        >

          <h1 className="text-4xl text-white font-bold text-center mb-8">
            Create Account
          </h1>

          <div className="relative mb-5">
            <FaUser className="absolute left-4 top-4 text-cyan-400" />

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full bg-slate-800 text-white rounded-xl py-3 pl-12 pr-4 outline-none"
              required
            />
          </div>

          <div className="relative mb-5">
            <FaEnvelope className="absolute left-4 top-4 text-cyan-400" />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-slate-800 text-white rounded-xl py-3 pl-12 pr-4 outline-none"
              required
            />
          </div>

          <div className="relative mb-8">
            <FaLock className="absolute left-4 top-4 text-cyan-400" />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-slate-800 text-white rounded-xl py-3 pl-12 pr-4 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition py-3 rounded-xl text-white text-lg font-semibold"
          >
            Register
          </button>

          <p className="text-center text-slate-400 mt-6">
            Already have an account?

            <Link
              to="/login"
              className="text-cyan-400 ml-2"
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