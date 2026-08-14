import { useEffect, useState } from "react";
import {
  getDestinations,
  searchDestinations,
} from "../../services/destinationService";
import { addFavorite } from "../../api/favoriteApi";
import toast from "react-hot-toast";

function Destinations() {
  const [destinations, setDestinations] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [state, setState] = useState("");
  const [maxCost, setMaxCost] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Temporary test user.
  // We will connect this to JWT authentication later.
  const userId = 4;

  useEffect(() => {
    loadDestinations();
  }, []);

  // Load all destinations
  async function loadDestinations() {
    try {
      setLoading(true);
      setError("");

      const data = await getDestinations();

      setDestinations(data);
    } catch (err) {
      console.error("Destination loading error:", err);

      setError("Unable to load destinations.");
    } finally {
      setLoading(false);
    }
  }

  // Search destinations
  async function handleSearch(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = await searchDestinations({
        name: search,
        category: category,
        state: state,
        max_cost: maxCost,
      });

      setDestinations(data);
    } catch (err) {
      console.error("Search error:", err);

      setError("Unable to search destinations.");
    } finally {
      setLoading(false);
    }
  }

  // Clear filters
  async function clearFilters() {
    setSearch("");
    setCategory("");
    setState("");
    setMaxCost("");

    await loadDestinations();
  }

  // Add destination to favorites
  async function handleAddFavorite(destinationId) {
    try {
      await addFavorite(userId, destinationId);

      toast.success("Added to Favorites ❤️");
    } catch (error) {
      console.error("Favorite error:", error);

      if (error.response?.status === 400) {
        toast.error("Already in Favorites");
      } else if (error.response?.status === 401) {
        toast.error("Please login first");
      } else {
        toast.error("Could not add to Favorites");
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-12">

      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}

        <div className="mb-10">

          <p className="text-cyan-400 font-semibold mb-2">
            EXPLORE INDIA
          </p>

          <h1 className="text-5xl font-extrabold mb-4">
            Discover Destinations
          </h1>

          <p className="text-slate-400 text-lg max-w-2xl">
            Explore amazing destinations and find the perfect place
            for your next adventure.
          </p>

        </div>


        {/* ================= SEARCH & FILTERS ================= */}

        <form
          onSubmit={handleSearch}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-10"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Search */}

            <input
              type="text"
              placeholder="Search destination..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-cyan-400"
            />


            {/* Category */}

            <input
              type="text"
              placeholder="Category e.g. Historical"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-cyan-400"
            />


            {/* State */}

            <input
              type="text"
              placeholder="State e.g. Goa"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-cyan-400"
            />


            {/* Maximum Cost */}

            <input
              type="number"
              min="0"
              placeholder="Max entrance fee"
              value={maxCost}
              onChange={(e) => setMaxCost(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-cyan-400"
            />

          </div>


          {/* Buttons */}

          <div className="flex flex-wrap gap-3 mt-5">

            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 px-7 py-3 rounded-xl font-semibold transition"
            >
              🔍 Search Destinations
            </button>

            <button
              type="button"
              onClick={clearFilters}
              className="bg-slate-800 hover:bg-slate-700 px-7 py-3 rounded-xl font-semibold transition"
            >
              Clear Filters
            </button>

          </div>

        </form>


        {/* ================= ERROR ================= */}

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-5 mb-8">
            {error}
          </div>
        )}


        {/* ================= LOADING ================= */}

        {loading && (
          <div className="text-center py-20">

            <p className="text-cyan-400 text-xl">
              Loading destinations...
            </p>

          </div>
        )}


        {/* ================= NO RESULTS ================= */}

        {!loading && destinations.length === 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">

            <div className="text-5xl mb-5">
              🌍
            </div>

            <h2 className="text-2xl font-bold">
              No destinations found
            </h2>

            <p className="text-slate-400 mt-3">
              Try changing your search or filters.
            </p>

          </div>
        )}


        {/* ================= DESTINATION CARDS ================= */}

        {!loading && destinations.length > 0 && (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {destinations.map((place) => (

              <div
                key={place.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-400/50 hover:-translate-y-1 transition-all duration-300 shadow-xl"
              >

                {/* Card Header */}

                <div className="h-32 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center">

                  <span className="text-6xl">
                    🌍
                  </span>

                </div>


                {/* Card Content */}

                <div className="p-6">

                  {/* Name + Rating */}

                  <div className="flex justify-between items-start gap-3">

                    <h2 className="text-2xl font-bold">
                      {place.name}
                    </h2>

                    {place.rating !== undefined && (
                      <span className="text-yellow-400 whitespace-nowrap">
                        ⭐ {place.rating || "New"}
                      </span>
                    )}

                  </div>


                  {/* Location */}

                  <p className="text-cyan-400 mt-3">
                    📍 {place.city}, {place.state}
                  </p>


                  {/* Category */}

                  <div className="mt-4">

                    <span className="inline-block bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm">
                      {place.category}
                    </span>

                  </div>


                  {/* Description */}

                  {place.description && (
                    <p className="text-slate-400 mt-4 line-clamp-3">
                      {place.description}
                    </p>
                  )}


                  {/* Favorite Button */}

                  <button
                    type="button"
                    onClick={() => handleAddFavorite(place.id)}
                    className="mt-5 w-full bg-pink-500/10 border border-pink-500/30 text-pink-400 hover:bg-pink-500 hover:text-white py-3 rounded-xl font-semibold transition"
                  >
                    ❤️ Add to Favorites
                  </button>


                  {/* Divider */}

                  <div className="mt-5 pt-4 border-t border-slate-800">


                    {/* Entrance Fee */}

                    {place.average_cost !== undefined && (
                      <div>

                        <p className="text-slate-500 text-sm">
                          Entrance Fee
                        </p>

                        <p className="text-white font-semibold mt-1">
                          ₹{place.average_cost}
                        </p>

                      </div>
                    )}


                    {/* Best Time */}

                    {place.best_time_to_visit && (
                      <div className="mt-4">

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

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Destinations;