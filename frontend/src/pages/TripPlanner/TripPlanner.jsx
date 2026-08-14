import { useState } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";

function TripPlanner() {
  const [form, setForm] = useState({
    destination: "",
    days: 3,
    budget: "",
    interests: "",
  });

  const [tripPlan, setTripPlan] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.destination || !form.budget || !form.interests) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setTripPlan("");

      const response = await api.post("/trip/plan", {
        destination: form.destination,
        days: Number(form.days),
        budget: Number(form.budget),
        interests: form.interests,
      });

      setTripPlan(response.data.trip_plan);

      toast.success("Trip plan generated! ✨");
    } catch (error) {
      console.error("Trip planner error:", error);

      toast.error("Unable to generate trip plan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-12">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-12">

          <p className="text-cyan-400 font-semibold mb-3">
            AI TRAVEL PLANNER
          </p>

          <h1 className="text-5xl font-extrabold mb-5">
            Plan Your Perfect Trip ✈️
          </h1>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Tell us where you want to go, your budget, and what you
            love doing. Our AI will create a personalized itinerary.
          </p>

        </div>


        {/* FORM */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl mb-10">

          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Destination */}

              <div>

                <label className="block text-slate-300 mb-2 font-semibold">
                  Destination
                </label>

                <input
                  type="text"
                  name="destination"
                  value={form.destination}
                  onChange={handleChange}
                  placeholder="e.g. Goa"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-cyan-400"
                />

              </div>


              {/* Days */}

              <div>

                <label className="block text-slate-300 mb-2 font-semibold">
                  Number of Days
                </label>

                <input
                  type="number"
                  name="days"
                  min="1"
                  max="30"
                  value={form.days}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
                />

              </div>


              {/* Budget */}

              <div>

                <label className="block text-slate-300 mb-2 font-semibold">
                  Budget (₹)
                </label>

                <input
                  type="number"
                  name="budget"
                  min="0"
                  value={form.budget}
                  onChange={handleChange}
                  placeholder="e.g. 15000"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-cyan-400"
                />

              </div>


              {/* Interests */}

              <div>

                <label className="block text-slate-300 mb-2 font-semibold">
                  Interests
                </label>

                <input
                  type="text"
                  name="interests"
                  value={form.interests}
                  onChange={handleChange}
                  placeholder="e.g. beaches, food, adventure"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-cyan-400"
                />

              </div>

            </div>


            {/* SUBMIT */}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-700 py-4 rounded-xl text-lg font-bold transition"
            >
              {loading
                ? "🤖 Creating Your Trip..."
                : "✨ Generate My Trip Plan"}
            </button>

          </form>

        </div>


        {/* GENERATED PLAN */}

        {tripPlan && (

          <div className="bg-slate-900 border border-cyan-500/30 rounded-3xl p-8 shadow-2xl">

            <div className="flex items-center gap-3 mb-6">

              <div className="text-4xl">
                🗺️
              </div>

              <div>

                <p className="text-cyan-400 font-semibold">
                  AI GENERATED ITINERARY
                </p>

                <h2 className="text-3xl font-bold">
                  Your Travel Plan
                </h2>

              </div>

            </div>


            <div className="border-t border-slate-800 pt-6">

              <div className="whitespace-pre-wrap text-slate-300 leading-8 text-lg">
                {tripPlan}
              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default TripPlanner;