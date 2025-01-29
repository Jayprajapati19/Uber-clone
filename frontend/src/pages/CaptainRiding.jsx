import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = () => {
  const location = useLocation();
  const ride = location.state?.ride;

  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);

  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
  );

  return (
    <div className="h-screen">
      <div className="flex justify-between items-center">
        <img
          className="w-16 absolute z-10 left-5 top-5"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="uberlogo"
        />
        <Link to={"/captain-home"}>
          <div className="fixed right-3 top-3 z-10 h-10 w-10 bg-white flex items-center justify-center rounded-full">
            <i className="text-2xl font-semibold ri-logout-box-r-line"></i>
          </div>
        </Link>
      </div>
      <div className="h-4/5">
        {/* <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="uber map"
        /> */}
        <LiveTracking/> 
      </div>

      <div className="h-1/5 p-6 relative flex items-center justify-between bg-yellow-400" onClick={() => {
        setFinishRidePanel(true);
      }}>
        <h5
          onClick={() => {}}
          className="text-center font-bold absolute p-1 top-0 w-[88%]"
        >
          <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i>
        </h5>
        <h4 className="text-xl font-semibold">{'4 KM away'}</h4>
        <button className="px-10 bg-green-600 text-white font-semibold p-3 rounded-lg">
          Complete Ride
        </button>
      </div>

      <div
        ref={finishRidePanelRef}
        className="fixed translate-y-full w-full z-10 bg-white bottom-0 px-3 pt-12 py-10"
      >
        <FinishRide ride = {ride} setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  );
};

export default CaptainRiding;
