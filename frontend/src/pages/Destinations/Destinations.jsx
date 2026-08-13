import { useEffect, useState } from "react";
import { getDestinations } from "../../services/destinationService";

function Destinations() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    loadDestinations();
  }, []);

  async function loadDestinations() {
    try {
      const data = await getDestinations();
      setDestinations(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-8">Destinations</h1>

      {destinations.map((place) => (
        <div
          key={place.id}
          className="border rounded-xl p-5 mb-5"
        >
          <h2>{place.name}</h2>
          <p>{place.location}</p>
        </div>
      ))}
    </div>
  );
}

export default Destinations;