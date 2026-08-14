import { useEffect, useState } from "react";
import { getFavorites, removeFavorite } from "../../api/favoriteApi";
import { getDestinations } from "../../services/destinationService";
import toast from "react-hot-toast";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = 4;

  useEffect(() => {
    loadFavorites();
  }, []);

  async function loadFavorites() {
    try {
      setLoading(true);

      const [favoriteData, destinationData] = await Promise.all([
        getFavorites(userId),
        getDestinations(),
      ]);

      setFavorites(favoriteData);
      setDestinations(destinationData);
    } catch (error) {
      console.error("Favorites error:", error);
      toast.error("Unable to load favorites");
    } finally {
      setLoading(false);
    }
  }

  function getDestination(destinationId) {
    return destinations.find(
      (destination) => destination.id === destinationId
    );
  }

  async function handleRemove(favoriteId) {
    try {
      await removeFavorite(favoriteId);

      setFavorites((current) =>
        current.filter((favorite) => favorite.id !== favoriteId)
      );

      toast.success("Removed from Favorites");
    } catch (error) {
      console.error("Remove favorite error:", error);
      toast.error("Could not remove favorite");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <h1 className="text-2xl text-cyan-400">
          Loading favorites...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-12">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <p className="text-pink-400 font-semibold mb-3">
            YOUR COLLECTION
          </p>

          <h1 className="text-5xl font-bold">
            My Favorites ❤️
          </h1>

          <p className="text-slate-400 mt-4">
            Your saved travel destinations.
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-20">

            <div className="text-6xl mb-6">
              ❤️
            </div>

            <h2 className="text-2xl font-bold">
              No Favorites Yet
            </h2>

            <p className="text-slate-400 mt-3">
              Go to Destinations and save places you want to visit.
            </p>

          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {favorites.map((favorite) => {

              const place = getDestination(
                favorite.destination_id
              );

              return (
                <div
                  key={favorite.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-pink-400/50 transition"
                >

                  <div className="h-32 bg-gradient-to-br from-pink-500/20 to-purple-600/20 flex items-center justify-center">
                    <span className="text-6xl">
                      ❤️
                    </span>
                  </div>

                  <div className="p-6">

                    <h2 className="text-2xl font-bold">
                      {place
                        ? place.name
                        : `Destination #${favorite.destination_id}`}
                    </h2>

                    {place && (
                      <>
                        <p className="text-cyan-400 mt-3">
                          📍 {place.city}, {place.state}
                        </p>

                        <div className="mt-4">
                          <span className="inline-block bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm">
                            {place.category}
                          </span>
                        </div>

                        <p className="text-slate-400 mt-4 line-clamp-3">
                          {place.description}
                        </p>

                        <p className="text-yellow-400 mt-4">
                          ⭐ {place.rating || "New"}
                        </p>
                      </>
                    )}

                    <button
                      onClick={() => handleRemove(favorite.id)}
                      className="w-full mt-6 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white py-3 rounded-xl font-semibold transition"
                    >
                      Remove Favorite
                    </button>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>

    </div>
  );
}

export default Favorites;