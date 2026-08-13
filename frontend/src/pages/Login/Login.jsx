import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { FaEnvelope, FaLock } from "react-icons/fa";
import toast from "react-hot-toast";
import { loginUser } from "../../api/authApi";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(form);

      localStorage.setItem("token", data.access_token);

      toast.success("Login Successful");

      navigate("/destinations");
    } catch (error) {
      console.error(error);
      toast.error("Invalid Email or Password");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 flex justify-center items-center px-5">

        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-slate-900 p-10 rounded-3xl shadow-2xl"
        >

          <h1 className="text-4xl text-white font-bold text-center mb-8">
            Welcome Back
          </h1>

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
            Login
          </button>

          <p className="text-center text-slate-400 mt-6">
            Don't have an account?

            <Link
              to="/register"
              className="text-cyan-400 ml-2"
            >
              Register
            </Link>
          </p>

        </form>

      </div>
    </>
  );
}

export default Login;