import { useEffect, useState } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadRecommendations();
  }, []);

  async function loadRecommendations() {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/recommendations/");

      setRecommendations(response.data);
    } catch (err) {
      console.error("Recommendations error:", err);

      setError("Unable to load recommendations.");

      toast.error("Could not load recommendations");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-12">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-12">

          <p className="text-cyan-400 font-semibold mb-2">
            AI TRAVEL PICKS
          </p>

          <h1 className="text-5xl font-extrabold mb-4">
            Recommended For You ✨
          </h1>

          <p className="text-slate-400 text-lg max-w-2xl">
            Discover some of the highest-rated destinations from
            our travel database.
          </p>

        </div>


        {/* LOADING */}

        {loading && (
          <div className="text-center py-20">

            <div className="text-5xl mb-5">
              🌍
            </div>

            <p className="text-cyan-400 text-xl">
              Finding the best destinations for you...
            </p>

          </div>
        )}


        {/* ERROR */}

        {!loading && error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-6 text-center">
            {error}
          </div>
        )}


        {/* NO RESULTS */}

        {!loading &&
          !error &&
          recommendations.length === 0 && (
            <div className="text-center py-20">

              <div className="text-6xl mb-5">
                🌍
              </div>

              <h2 className="text-2xl font-bold">
                No recommendations available
              </h2>

            </div>
          )}


        {/* RECOMMENDATION CARDS */}

        {!loading &&
          !error &&
          recommendations.length > 0 && (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {recommendations.map((place, index) => (

                <div
                  key={place.id}
                  className="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-400/60 hover:-translate-y-1 transition-all duration-300 shadow-xl"
                >

                  {/* RANK */}

                  <div className="absolute top-4 right-4 z-10">

                    <span className="bg-cyan-500 text-slate-950 font-bold px-3 py-1 rounded-full text-sm">
                      #{index + 1}
                    </span>

                  </div>


                  {/* IMAGE AREA */}

                  <div className="h-36 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center">

                    <span className="text-6xl">
                      🏞️
                    </span>

                  </div>


                  {/* CONTENT */}

                  <div className="p-6">

                    <h2 className="text-2xl font-bold pr-12">
                      {place.name}
                    </h2>


                    {/* LOCATION */}

                    <p className="text-cyan-400 mt-3">
                      📍 {place.city}, {place.state}
                    </p>


                    {/* CATEGORY */}

                    <div className="mt-4">

                      <span className="inline-block bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm">
                        {place.category}
                      </span>

                    </div>


                    {/* RATING */}

                    <div className="mt-5 flex items-center justify-between">

                      <div>

                        <p className="text-slate-500 text-sm">
                          Rating
                        </p>

                        <p className="text-yellow-400 text-xl font-bold mt-1">
                          ⭐ {place.average_rating || "New"}
                        </p>

                      </div>


                      {/* COST */}

                      <div className="text-right">

                        <p className="text-slate-500 text-sm">
                          Entrance Fee
                        </p>

                        <p className="text-white font-semibold mt-1">
                          ₹{place.average_cost ?? 0}
                        </p>

                      </div>

                    </div>


                    {/* BEST TIME */}

                    {place.best_time_to_visit && (

                      <div className="mt-5 pt-4 border-t border-slate-800">

                        <p className="text-slate-500 text-sm">
                          Best time to visit
                        </p>

                        <p className="text-cyan-400 mt-1">
                          {place.best_time_to_visit}
                        </p>

                      </div>

                    )}

                  </div>

                </div>

              ))}

            </div>

          )}

      </div>

    </div>
  );
}

export default Recommendations;