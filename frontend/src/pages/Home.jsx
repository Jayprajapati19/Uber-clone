import { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitForDriver";
import { useSocket } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [inputType, setInputType] = useState(""); // "pickup" or "destination"
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const vehicleRef = useRef(null);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const confirmRideRef = useRef(null);
  const [vehicleFound, setVehicleFound] = useState(false);
  const vechicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  const navigate = useNavigate();

  const { socket } = useSocket();
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);

  socket.on("ride-confirmed", (ride) => {
    setRide(ride);
    setVehicleFound(false);
    setWaitingForDriver(true);
  });

  socket.on("ride-started", (ride) => {
    setWaitingForDriver(false);
    navigate("/riding", { state: { ride } });
  });

  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: query },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleInputChange = (e, type) => {
    const value = e.target.value;
    if (type === "pickup") {
      setPickup(value);
    } else {
      setDestination(value);
    }
    setInputType(type);
    setPanelOpen(true);
    fetchSuggestions(value);
  };

  const handleSuggestionClick = async (suggestion) => {
    if (inputType === "pickup") {
      setPickup(suggestion);
    } else {
      setDestination(suggestion);
      await findTrip(suggestion);
    }
    setPanelOpen(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const clearInput = (type) => {
    if (type === "pickup") {
      setPickup("");
    } else {
      setDestination("");
    }
    setSuggestions([]);
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "80vh",
          opacity: 1,
          padding: 24,
          zIndex: 20,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0vh",
          opacity: 0,
          padding: 0,
          zIndex: -1,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehicleRef.current, {
          transform: "translateY(0)",
          zIndex: 30,
        });
      } else {
        gsap.to(vehicleRef.current, {
          transform: "translateY(100%)",
          zIndex: -1,
        });
      }
    },
    [vehiclePanel]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRideRef.current, {
          transform: "translateY(0)",
          zIndex: 40,
        });
      } else {
        gsap.to(confirmRideRef.current, {
          transform: "translateY(100%)",
          zIndex: -1,
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vechicleFoundRef.current, {
          transform: "translateY(0)",
          zIndex: 50,
        });
      } else {
        gsap.to(vechicleFoundRef.current, {
          transform: "translateY(100%)",
          zIndex: -1,
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
          zIndex: 60,
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
          zIndex: -1,
        });
      }
    },
    [waitingForDriver]
  );

  async function findTrip(destinationFull) {
    setVehiclePanel(true);
    setPanelOpen(false);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: {
          pickup,
          destination: destinationFull,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log(response.data);
    setFare(response.data);
  }

  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log(response.data);
  }

  return (
    <div className="h-screen relative overflow-hidden">
      <div className="flex justify-between  items-center">
        <img
          className="w-16 absolute z-10 left-5 top-5"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="uber logo"
        />
        <Link to={"/login"} onClick={() => localStorage.removeItem("token")}>
          <div className="fixed right-3 top-3 z-10 h-10 w-10 bg-white flex items-center justify-center rounded-full">
            <i className="text-2xl font-medium ri-logout-box-r-line"></i>
          </div>
        </Link>
      </div>

      <div className="h-screen w-screen">
        <LiveTracking />
      </div>

      <div className="absolute bottom-0 z-20 w-full">
        <div className={`${panelOpen ? 'h-[22vh] -mb-1' : 'h-[30vh] mb-0'} relative p-6 bg-white`}>
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute opacity-0 top-5 right-6 text-2xl font-bold"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold -mb-3">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
            className="relative py-2"
          >
            <div className="relative z-10 h-full my-5">
              <div className="absolute left-[18px] top-[45px] h-12 w-[3px] bg-black rounded-full"></div>
              <div className="absolute left-[16px] top-[35px] w-2 h-2 bg-white border-2 border-black rounded-full"></div>
              <div className="absolute left-[16px] top-[95px] w-2 h-2 bg-white border-2 border-black rounded-full"></div>
            </div>
            <div className="relative">
              <input
                className="bg-[#eee] w-full px-12 py-2 outline-none text-base mt-5 rounded-lg"
                type="text"
                value={pickup}
                onClick={() => {
                  setPanelOpen(true);
                }}
                onChange={(e) => handleInputChange(e, "pickup")}
                placeholder="Add a pick-up location"
              />
              {pickup && (
                <i
                  className="ri-close-line text-xl font-bold absolute right-3 top-[68%] transform -translate-y-1/2 cursor-pointer"
                  onClick={() => clearInput("pickup")}
                ></i>
              )}
            </div>
            <div className="relative">
              <input
                className="bg-[#eee] mt-5 w-full px-12 outline-none py-2 text-base rounded-lg"
                type="text"
                value={destination}
                onClick={() => {
                  setPanelOpen(true);
                }}
                onChange={(e) => handleInputChange(e, "destination")}
                placeholder="Enter your destination"
              />
              {destination && (
                <i
                  className="ri-close-line absolute right-3 top-[68%] text-xl font-bold transform -translate-y-1/2 cursor-pointer"
                  onClick={() => clearInput("destination")}
                ></i>
              )}
            </div>
          </form>
        </div>

        <div ref={panelRef} className="bg-white h-full overflow-y-scroll">
          <LocationSearchPanel
            suggestions={suggestions}
            handleSuggestionClick={handleSuggestionClick}
            setVehiclePanel={setVehiclePanel}
            setPanelOpen={setPanelOpen}
            inputType={inputType}
            setSuggestions={setSuggestions}
            findTrip={findTrip}
            setFare={setFare}
          />
        </div>
      </div>

      <div
        ref={vehicleRef}
        className="fixed w-full z-20 bg-white translate-y-full bottom-0 px-3 pt-12 py-10"
      >
        <VehiclePanel
          fare={fare}
          selectVehicle={setVehicleType}
          setVehiclePanel={setVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>

      <div
        ref={confirmRideRef}
        className="fixed w-full z-30 bg-white translate-y-full bottom-0 px-3 pt-12 py-6"
      >
        <ConfirmedRide
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>

      <div
        ref={vechicleFoundRef}
        className="fixed w-full z-40 bg-white translate-y-full bottom-0 px-3 pt-12 py-6"
      >
        <LookingForDriver
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setVehicleFound={setVehicleFound}
        />
      </div>

      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-50 bg-white translate-y-full bottom-0 px-3 pt-12 py-6"
      >
        <WaitingForDriver ride={ride} waitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
