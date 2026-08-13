import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import {
  FaMapMarkedAlt,
  FaRobot,
  FaHeart,
  FaPlaneDeparture,
} from "react-icons/fa";

function Home() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white pt-24">

        {/* Hero Section */}
        <section className="flex flex-col justify-center items-center text-center min-h-screen px-6">

          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-extrabold leading-tight"
          >
            Discover Your
            <br />
            <span className="text-cyan-400">
              Dream Destination
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-slate-300 max-w-3xl text-xl"
          >
            AI-powered travel recommendations, personalized destinations,
            intelligent trip planning and unforgettable journeys.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-10 flex gap-6"
          >
            <Link
              to="/destinations"
              className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl text-lg font-semibold transition"
            >
              Explore Destinations
            </Link>

            <Link
              to="/trip-planner"
              className="border border-cyan-400 px-8 py-4 rounded-xl hover:bg-cyan-400 hover:text-black transition"
            >
              AI Trip Planner
            </Link>
          </motion.div>

        </section>

        {/* Features */}

        <section className="max-w-7xl mx-auto px-8 pb-24">

          <h2 className="text-4xl font-bold text-center mb-14">
            Why Choose AI Travel?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="bg-slate-900 rounded-2xl p-8 hover:scale-105 transition">
              <FaMapMarkedAlt
                size={45}
                className="text-cyan-400 mb-5"
              />

              <h3 className="text-2xl font-bold mb-3">
                Smart Recommendations
              </h3>

              <p className="text-slate-400">
                Discover destinations based on your interests and travel
                history.
              </p>
            </div>

            <div className="bg-slate-900 rounded-2xl p-8 hover:scale-105 transition">
              <FaRobot
                size={45}
                className="text-cyan-400 mb-5"
              />

              <h3 className="text-2xl font-bold mb-3">
                Gemini AI Planner
              </h3>

              <p className="text-slate-400">
                Generate complete travel itineraries in seconds using AI.
              </p>
            </div>

            <div className="bg-slate-900 rounded-2xl p-8 hover:scale-105 transition">
              <FaHeart
                size={45}
                className="text-cyan-400 mb-5"
              />

              <h3 className="text-2xl font-bold mb-3">
                Favorites
              </h3>

              <p className="text-slate-400">
                Save destinations you love and revisit them anytime.
              </p>
            </div>

            <div className="bg-slate-900 rounded-2xl p-8 hover:scale-105 transition">
              <FaPlaneDeparture
                size={45}
                className="text-cyan-400 mb-5"
              />

              <h3 className="text-2xl font-bold mb-3">
                Easy Travel
              </h3>

              <p className="text-slate-400">
                Plan your entire journey from one intelligent platform.
              </p>
            </div>

          </div>

        </section>

      </div>
    </>
  );
}

export default Home;