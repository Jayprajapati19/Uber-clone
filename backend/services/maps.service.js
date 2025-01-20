const axios = require("axios");
const captainModel = require("../models/captain.model");

module.exports.getAddressCoordinate = async (address) => {
  const apiKey = "AlzaSyjC65tR83Ij8isSZU6q3S_pEfZOkcwmFKJ"; // Replace with your actual API key
  const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.status === "OK") {
      const location = data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error(`API error: ${data.error_message || data.status}`);
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    throw new Error("Unable to fetch coordinates. Please try again later.");
  }
};

module.exports.getDistanceTime = async (origins, destinations, params = {}) => {
  if (!origins || !destinations) {
    throw new Error("Origin and destination addresses are required");
  }
  const apiKey = "AlzaSyjC65tR83Ij8isSZU6q3S_pEfZOkcwmFKJ"; // Replace with your actual API key
  const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origins
  )}&destinations=${encodeURIComponent(destinations)}&key=${apiKey}`;

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: url,
    params: params,
    headers: {},
  };

  try {
    const response = await axios(config);
    if (response.data.status === "OK") {
      if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
        throw new Error("No routes found");
      }

      return response.data.rows[0].elements[0];
    } else {
      throw new Error("Unable to fetch distance and time");
    }
  } catch (err) {
    console.error(
      "Error fetching distance and time:",
      err.message,
      err.response ? err.response.data : err.stack
    );
    throw new Error(
      "Unable to fetch distance and time. Please try again later."
    );
  }
};

module.exports.getDirections = async (origin, destination, params = {}) => {
  const apiKey = "AlzaSyjC65tR83Ij8isSZU6q3S_pEfZOkcwmFKJ"; // Replace with your actual API key
  const url = `https://maps.gomaps.pro/maps/api/directions/json?origin=${encodeURIComponent(
    origin
  )}&destination=${encodeURIComponent(destination)}&key=${apiKey}`;

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: url,
    params: params,
    headers: {},
  };

  try {
    const response = await axios(config);
    if (response.data.status === "OK") {
      return response.data.routes;
    } else {
      throw new Error(
        `API error: ${response.data.error_message || response.data.status}`
      );
    }
  } catch (error) {
    console.error("Error fetching directions:", error.message, error.stack);
    throw new Error("Unable to fetch directions. Please try again later.");
  }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error("Query is required");
  }

  const apiKey = "AlzaSyjC65tR83Ij8isSZU6q3S_pEfZOkcwmFKJ"; // Replace with your actual API key
  const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&types=(regions)&language=en&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.predictions;
    } else {
      throw new Error(
        `API error: ${response.data.error_message || response.data.status}`
      );
    }
  } catch (err) {
    console.error("Error fetching suggestions:", err.message, err.stack);
    throw new Error("Unable to fetch suggestions. Please try again later.");
  }
};

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
  // radius in km

  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng], radius / 6371],
      },
    },
  });

  return captains;
};
