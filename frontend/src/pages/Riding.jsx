import { Link, useLocation } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";

const Riding = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { socket } = useSocket();
  const ride = location.state?.ride;

  async function endRide() {
    const rideId = ride._id;
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
      { rideId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      navigate("/captain-home");
    }
  }

  useEffect(() => {
    socket.on("ride-ended", () => {
      navigate("/home");
    });
  }, [socket, navigate]);

  return (
    <div className="h-screen">
      <div className="flex justify-between  items-center">
        <img
          className="w-16 absolute z-10 left-5 top-5"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="uber logo"
        />
        <Link to={"/login"}>
          <div className="fixed right-3 top-3 z-10 h-10 w-10 bg-white flex items-center justify-center rounded-full">
            <i className="text-2xl font-medium ri-home-5-line"></i>
          </div>
        </Link>
      </div>
      <div className="h-1/2">
        {/* <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="uber map"
        /> */}
        <LiveTracking />
      </div>

      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-20"
            src="https://i.pinimg.com/474x/8d/21/7b/8d217b1000b642005fea7b6fd6c3d967.jpg"
            alt="car image"
          />
          <div className="text-right">
            <h2 className="text-lg font-medium capitalize">
              {ride?.captain?.fullname.firstname +
                " " +
                ride?.captain?.fullname.lastname || "Captain Name"}
            </h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">
              {ride?.captain?.vehicle?.plate || "Vehicle Plate"}
            </h4>
            <p className="text-xm text-gray-600 ">
              Swift Dzire, {ride?.captain?.vehicle?.color || "Vehicle Model"}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 justify-between items-center">
          <div className="w-full">
            <div className="flex items-center mt-6 gap-5 p-3 border-b-2">
              <i className="ri-map-pin-fill text-2xl"></i>
              <div>
                <h3 className="text-xl font-medium">562/11-A</h3>
                <p className="text-sm text-gray-600 ">
                  {ride?.pickup || "Pickup Address"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3">
              <i className="text-2xl ri-currency-fill"></i>
              <div>
                <h3 className="text-xl font-medium">
                  ₹{ride?.fare || "Fare Amount"}
                </h3>
                <p className="text-sm text-gray-600 ">{"Cash, Cash"}</p>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={endRide}
          className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg"
        >
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
