
const ConfirmedRide = (props) => {
  const vehicleType=props.vehicleType;
  const fare = props.fare;
  return (
    <div>
      <h5
        onClick={() => {
          props.setConfirmRidePanel(false);
        }}
        className="text-center font-bold absolute p-1 top-0 w-[93%]"
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold">Confirm your Ride</h3>

      <div className="flex flex-col gap-2 justify-between items-center">
        <img
          className="h-44"
          src="https://i.pinimg.com/474x/8d/21/7b/8d217b1000b642005fea7b6fd6c3d967.jpg"
          alt="car image"
        />
        <div className="w-full">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-2xl ri-map-pin-user-line"></i>
            <div>
              <h3 className="text-xl font-medium">562/11-A</h3>
              <p className="text-sm text-gray-600 ">{props.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-fill text-2xl"></i>
            <div>
              <h3 className="text-xl font-medium">562/11-A</h3>
              <p className="text-sm text-gray-600 ">{props.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="text-2xl ri-currency-fill"></i>
            <div>
              <h3 className="text-xl font-medium">₹{fare[vehicleType]}</h3>
              <p className="text-sm text-gray-600 ">Cash, Cash</p>
            </div>
          </div>
        </div>
        <button onClick={() =>{
            props.setVehicleFound(true);
            props.setConfirmRidePanel(false);
            props.createRide();
        }} className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmedRide;
