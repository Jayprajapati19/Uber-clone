const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
    validate: {
      validator: function (v) {
        return (
          Array.isArray(v) && v.length === 2 && !isNaN(v[0]) && !isNaN(v[1])
        );
      },
      message: (props) => `${props.value} is not a valid coordinate pair!`,
    },
  },
});

const rideSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    captain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "captain",
    },
    pickup: locationSchema,
    destination: locationSchema,
    fare: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
      default: "pending",
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "motorcycle", "auto", "moto"],
    },
    duration: {
      type: Number,
    }, // in seconds

    distance: {
      type: Number,
    }, // in meters

    paymentID: {
      type: String,
    },
    orderId: {
      type: String,
    },
    signature: {
      type: String,
    },
    otp: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 4,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ride", rideSchema);
