import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Destinations from "./pages/Destinations/Destinations";
import Recommendations from "./pages/Recommendations/Recommendations";
import Favorites from "./pages/Favorites/Favorites";
import TripPlanner from "./pages/TripPlanner/TripPlanner";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/destinations" element={<Destinations />} />

      <Route
        path="/recommendations"
        element={<Recommendations />}
      />

      <Route
        path="/favorites"
        element={<Favorites />}
      />

      <Route
        path="/trip-planner"
        element={<TripPlanner />}
      />
    </Routes>
  );
}

export default App;