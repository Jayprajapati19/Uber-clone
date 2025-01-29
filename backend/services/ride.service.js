const rideModel = require("../models/ride.model");
const { sendMessageToSocketId } = require("../socket");
const mapService = require("./maps.service");
const crypto = require("crypto");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  const fareRates = {
    auto: 10, // rate per km
    car: 15, // rate per km
    motorcycle: 8, // rate per km
  };

  const fare = {
    auto: Math.round((distanceTime.distance.value / 1000) * fareRates.auto),
    car: Math.round((distanceTime.distance.value / 1000) * fareRates.car),
    moto: Math.round(
      (distanceTime.distance.value / 1000) * fareRates.motorcycle
    ),
  };

  return fare;
}

module.exports.getFare = getFare;

function getOtp(num) {
  const otp = crypto
    .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
    .toString();
  return otp;
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("User, pickup, destination and vehicle type are required");
  }

  const fare = await getFare(pickup, destination);

  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
  });

  return ride;
};

module.exports.confirmRide = async ({ rideId, captainId }) => {

  if (!rideId) {
    throw new Error("Ride id is required");
  }

  await rideModel.findOneAndUpdate(
    { _id: rideId },
    { status: "accepted", captain: captainId }
  );

  const ride = await rideModel.findOne({ _id: rideId }).populate("user").populate("captain").select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
};

module.exports.startRide = async ({ rideId, otp }) => {
  if (!rideId || !otp) {
    throw new Error("Ride id and OTP are required");
  };

  const ride = await rideModel.findOne({ _id: rideId }).populate("user").populate("captain").select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if(ride.status !== 'accepted'){
    throw new Error("Ride not accepted");
  }

  if (ride.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  await rideModel.findOneAndUpdate({ _id: rideId }, { status: "ongoing" });

  sendMessageToSocketId(ride.user.socketId, {
    event: "ride-started",
    data: ride,
  });

  return ride;
}

module.exports.endRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }
  const ride = await rideModel.findOne({ _id: rideId, captain:captain._id }).populate("user").populate("captain").select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }
  if(ride.status !== 'ongoing'){
    throw new Error("Ride not ongoing");
  }
  await rideModel.findOneAndUpdate({ _id: rideId }, { status: "completed" });

  return ride;

}