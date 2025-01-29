
const WaitingForDriver = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.waitingForDriver(false);
        }}
        className="text-center font-bold absolute p-1 top-0 w-[93%]"
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>

      <div className="flex items-center justify-between">
      <img
          className="h-20"
          src="https://i.pinimg.com/474x/8d/21/7b/8d217b1000b642005fea7b6fd6c3d967.jpg"
          alt="car image"
        />
        <div className="text-right">
          <h2 className="text-lg capitalize font-medium">{props.ride?.captain.fullname.firstname + " " + props.ride?.captain.fullname.lastname}</h2>
          <h4 className="text-xl uppercase font-semibold -mt-1 -mb-1">{props.ride?.captain.vehicle.plate}</h4>
          <p className="text-xm text-gray-600 capitalize">Swift Dzire, {props.ride?.captain.vehicle.color}</p>
          <h1 className="font-medium mt-2 border-2 px-1 text-center border-black text-lg">Secret - <span className="text-lg text-red-600 font-semibold">{props.ride?.otp}</span></h1>
        </div>
      </div>

      <div className="flex flex-col gap-2 justify-between items-center">
        <div className="w-full">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-2xl ri-map-pin-user-line"></i>
            <div>
              <h3 className="text-xl font-medium">562/11-A</h3>
              <p className="text-sm text-gray-600 ">{props.ride?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-fill text-2xl"></i>
            <div>
              <h3 className="text-xl font-medium">562/11-A</h3>
              <p className="text-sm text-gray-600 ">{props.ride?.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="text-2xl ri-currency-fill"></i>
            <div>
              <h3 className="text-xl font-medium">₹{props.ride?.fare}</h3>
              <p className="text-sm text-gray-600 ">Cash, Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver