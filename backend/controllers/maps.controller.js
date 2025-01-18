const mapService = require("../services/maps.service");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { address } = req.query;

    // Validate query parameter
    if (!address) {
      return res.status(400).json({ message: "Address is required" });
    }

    // Call mapService to get coordinates
    const coordinates = await mapService.getAddressCoordinate(address);

    // Return the response
    return res.status(200).json(coordinates);
  } catch (error) {
    console.error("Error in getCoordinates:", error.message);

    // Differentiate errors for better responses
    if (error.message.includes("API error")) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getDistanceTime = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { origins, destinations, ...params } = req.query;

    // Validate query parameters
    if (!origins || !destinations) {
      return res
        .status(400)
        .json({ message: "Both origins and destinations are required" });
    }

    // Call mapService to get distance and time
    const distanceTime = await mapService.getDistanceTime(
      origins,
      destinations,
      params
    );

    // Return the response
    return res.status(200).json(distanceTime);
  } catch (error) {
    console.error(
      "Error in getDistanceTime:",
      error.message,
      error.response ? error.response.data : error.stack
    );

    // Differentiate errors for better responses
    if (error.message.includes("No routes found")) {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getDirections = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { origin, destination, ...params } = req.query;

    // Validate query parameters
    if (!origin || !destination) {
      return res
        .status(400)
        .json({ message: "Both origin and destination are required" });
    }

    // Call mapService to get directions
    const directions = await mapService.getDirections(
      origin,
      destination,
      params
    );

    // Return the response
    return res.status(200).json(directions);
  } catch (error) {
    console.error("Error in getDirections:", error.message, error.stack);

    // Differentiate errors for better responses
    if (error.message.includes("API error")) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
    console.log(directions);
  }
};
