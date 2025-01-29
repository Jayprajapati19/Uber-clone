const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const RideController = require("../controllers/ride.controller");
const authMidleware = require("../middlewares/auth.middleware");

router.post(
  "/create",
  authMidleware.authUser,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "moto"])
    .withMessage("Invalid vehicle type"),
  RideController.createRide
);

router.get(
  "/get-fare",
  authMidleware.authUser,
  query("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  RideController.getFare
);

router.post(
  "/confirm",
  authMidleware.authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  RideController.confirmRide
);

router.post(
  "/start-ride",
  authMidleware.authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  body("otp")
    .isString()
    .isLength({ min: 6, max: 6 })
    .withMessage("Invalid OTP"),
  RideController.startRide
);

router.post('/end-ride', authMidleware.authCaptain, body('rideId').isMongoId().withMessage('Invalid ride id'), RideController.endRide);

module.exports = router;
